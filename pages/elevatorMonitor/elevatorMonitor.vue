<template>
	<view class="eleva">
		<!-- nav -->
		<view class="ele-nav">
			<view class="ele-nav-li bg1">
				<view class="ele-nav-li-num">{{ classList.line+classList.online || 0 }}</view>
				<view class="ele-nav-li-text">电梯总数</view>
			</view>
			<view class="ele-nav-li bg2">
				<view class="ele-nav-li-num">{{ classList.line || 0 }}</view>
				<view class="ele-nav-li-text">在线电梯</view>
			</view>
			<view class="ele-nav-li bg3">
				<view class="ele-nav-li-num">{{ classList.fault || 0 }}</view>
				<view class="ele-nav-li-text">故障数量</view>
			</view>
			<view class="ele-nav-li bg4">
				<view class="ele-nav-li-num">{{ classList.maint || 0 }}</view>
				<view class="ele-nav-li-text">检修数量</view>
			</view>
		</view>
		<!-- 列表板块 -->
		<view class="ele-bot">
			<view class="ele-bot-top">
				<view class="ele-bot-top-xl">
					<view class="ele-bot-top-xl-ad1" @click="changeAddres">
						{{ addText }}
						<image src="../../static/image/wxj/xia.png" mode=""></image>
					</view>
					<view class="ele-bot-top-xl-ad2" @click="changeXq">
						{{ xqText }}<image src="../../static/image/wxj/xia.png" mode=""></image>
					</view>
				</view>
				<view class="ele-bot-top-text">
					共找到<text>{{ countNum }}条</text>数据
				</view>
			</view>
			<!-- 列表 -->
			<view class="ele-bot-sj">
				<view class="ele-list" v-if="list.length>0">
					<navigator v-for="(item, index) in list" :key="item.index" :url="'/pages/eleInfo/eleInfo?item='+encodeURIComponent(JSON.stringify(item))">
						<view class="ele-list-li">
							<view class="ele-list-li-top">
								<view class="ele-list-li-top-name">
									{{ item.name }}
								</view>
								<view class="ele-list-li-top-studus">
									<view class="ele-list-li-top-studus-le le_a" v-if="item.is_online == 1">
										<image src="../../static/icon/feedback/success.png"></image> 在线
									</view>
									<view class="ele-list-li-top-studus-le le_b" v-else-if="item.is_online == 0">
										<image src="../../static/icon/clear.png"></image> 离线
									</view>
									<view class="ele-list-li-top-studus-le le_c" v-else-if="item.is_online == 3">
										<image src="../../static/icon/state/fault.png"></image> 故障
									</view>
									<view class="ele-list-li-top-studus-le le_d" v-else-if="item.is_online == 2">
										<image src="../../static/icon/state/overhaul.png"></image> 检修
									</view>
								</view>
							</view>
							<view class="ele-list-li-num">
								电梯编号：{{ item.elevator_number }} <text v-if="item.register_code">【{{ item.register_code }}】</text>
							</view>
							<view class="ele-list-li-addres">
								电梯地址：{{ item.address }}
							</view>
						</view>
					</navigator>
					<!-- 加载中/没有更多数据 -->
					<uni-load-more iconType="snow" :iconSize="14" :status="status" />
				</view>
				<!-- 没有数据 -->
				<view class="null" v-else>
					<Null :title="title"></Null>
				</view>
			</view>
		</view>
		<van-popup :show="addresShow" position="bottom" @close="onClose">
			<van-area @confirm="isokAdd" @cancel="onClose" :area-list="areaList" />
		</van-popup>
		<van-popup :show="xqShow" position="bottom" @close="onCloseXq">
			<scroll-view scroll-y="true" style="height: 700rpx;">
				<view class="proTitle">请选择小区</view>
				<view class="xq-list" v-if="xqList.length>0">
					<view class="xq-list-li" v-for="(item,index) in xqList" :key="index" @click="xqItem(item.village_id)">
						<view class="xq-list-li-text" :class="item.village_id == xqCode?'xq-list-li-text_act':''">{{ item.village_name }}</view>
						<view class="xq-list-li-gx" v-if="item.village_id == xqCode">
							<van-icon name="success" color="#1989fa" size="18px" />
						</view>
					</view>
				</view>
				<view class="null" v-else>
					<Null :title="title"></Null>
				</view>
			</scroll-view>
		</van-popup>
	</view>
</template>

<script>
	import request from '@/service/request.js'
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import AREA from "@/utils/area.js"
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
	export default {
		components: {
			Null,
			uniLoadMore
		},
		data() {
			return {
				page: 1,
				size: 5,
				isMore: true, //是否可以可以上拉
				countNum: 0,
				qqmapsdk:[],
				xqShow: false,
				xqText: '全部小区',
				xqCode: 0,
				addText: '重庆',
				dqCode: 0,
				ssCode: 500000,
				addresShow: false,
				classList: {},
				status: 'more',
				title: '暂无数据',
				areaList: {},
				xqList: [],
				list: [],
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		onLoad() {
			let that = this;
			that.areaList = AREA;
			// 实例化地址API核心类
			that.qqmapsdk = new QQMapWX({
				key: 'T3YBZ-TUB6X-VLL4G-7MEJH-DPPNT-DWBM3'
			});
			that.getClassNx();
			that.getDw();
		},
		methods: {
			xqItem(xqId) {
				console.log(xqId)
				let that = this;
				if(that.xqCode == xqId){
					uni.showToast({
						title:'已选择该小区',
						icon:'none'
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '是否确认切换小区',
						success: function (res) {
							if (res.confirm) {
								that.page = 1;
								that.isMore = true;
								that.xqCode = xqId;
								that.onCloseXq();
								that.getList(that.ssCode,that.dqCode,xqId,'');
							} else if (res.cancel) {
								that.onCloseXq();
							}
						}
					});
				}
				
			},
			isokAdd(e) {
				console.log(e)
				let that = this;
				let value = e.target.values;
				that.addText = value[2].name;
				that.dqCode = value[2].code;
				that.ssCode = value[0].code;
				that.xqText = '全部小区',
				that.xqCode = 0,
				that.page = 1;
				that.isMore = true;
				that.getList(value[0].code,value[2].code,'','');
				that.getXqText(value[2].code);
				that.onClose();
			},
			onCloseXq() {
				let that = this;
				that.xqShow = false;
			},
			changeXq() {
				let that = this;
				that.xqShow = true;
			},
			changeAddres() {
				let that = this;
				that.addresShow = true;
			},
			onClose() {
				let that = this;
				that.addresShow = false;
			},
			//获取电梯各类型数量
			getClassNx() {
				let that = this;
				let data = {};
				request.post('/statistical/elevator', data).then((res) => {
					if (res.code == 1) {
						that.classList = res.data
					}
				})
			},
			//获取小区
			getXqText(dcId) {
				let that = this;
				let data = {
					area_id: dcId
				};
				that.page = 1;
				that.isMore = true;
				request.post('/region/village', data).then((res) => {
					console.log('1',res)
					if(res.code == 1){
						that.xqList = res.data;
						that.getList(that.ssCode,that.dqCode,'','');
					}
				})
			},
			//获取电梯列表 ssId:省市id dcId:区县id xqId:小区id isSla:是否是上拉刷新
			getList(ssId,dcId,xqId,isSla) {
				let that = this;
				let data;
				if(xqId){
					data = {
						province_id:ssId,
						area_id: dcId,
						limit: that.size,
						page: that.page,
						village_id: xqId
					};
				}else{
					data = {
						province_id:ssId,
						area_id: dcId,
						limit: that.size,
						page: that.page
					};
				}
				request.post('/lift/monitoring', data).then((res) => {
					console.log('2',res)
					if(res.code == 1){
						if(res.data.length < 5){
							that.isMore = false;
							that.status = 'noMore';
						}
						if(isSla){
							that.list = that.list.concat(res.data)
						}else{
							that.list = [];
							that.list = res.data;
						}
						if(res.count){
							that.countNum = res.count
						}
					}
				})
			},
			// 获取定位
			getDw() {
				let that = this;
				// 获取经纬度
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						uni.showLoading({
							title:'加载中...'
						})
						uni.getLocation({
							type: 'gcj02', //返回可以用于uni.openLocation的经纬度
							success: function(res) {
								const latitude = res.latitude;
								const longitude = res.longitude;
								that.getLocal(latitude,longitude);
							}
						});
					},
					fail(err) {
						uni.showToast({
							title: '您取消了授权，将使用默认地区',
							icon: 'none'
						})
						that.getList(that.ssCode,'','','');
					}

				})
			},
			// 转换坐标为当前地理位置
			getLocal: function(latitude, longitude) {
				let that = this;
				that.qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						that.dqCode = res.result.ad_info.adcode;
						that.addText = res.result.ad_info.district;
						that.ssCode = Number(res.result.ad_info.city_code.replace(res.result.ad_info.nation_code,""));
						console.log(that.ssCode)
						that.getXqText(res.result.ad_info.adcode);
						uni.hideLoading()
					},
					fail: function(res) {}
				})
			}

		},
		// onPullDownRefresh() {
		// 	console.log('下拉开始')
		// 	setTimeout(function() {
		// 		console.log('下拉结束')
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		onReachBottom() {
			let that = this;
			if(that.isMore == true){
				let pageNumber = that.page + 1;
				that.status = 'loading';
				that.page = pageNumber;
				that.getList(that.ssCode,that.dqCode,that.xqCode,1);
			}
		},
	}
</script>

<style scoped>
	.proTitle {
		font-size: 28rpx;
		text-align: center;
		padding: 40rpx;
		box-sizing: border-box;
		font-weight: bolder;
		color: #333;
	}

	.xq-list-li {
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		border-bottom: 2rpx solid #eee;
		height: 80rpx;
		line-height: 80rpx;
	}

	.xq-list-li-text_act {
		color: #1989fa !important;
	}

	.xq-list-li-gx{
		width: 80rpx;
		line-height: 80rpx;
		text-align: right;
	}
	.ele-nav {
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 2rpx solid #f8f8f8;
		border-bottom: 20rpx solid #f8f8f8;
	}

	.ele-nav-li {
		width: 140rpx;
		height: 140rpx;
		text-align: center;
		padding: 30rpx 0rpx 20rpx;
		box-sizing: border-box;
		color: #fff;
		border-radius: 10rpx;
	}

	.bg1 {
		background-color: #5E9BE9;
	}

	.bg2 {
		background-color: #21CFCF;
	}

	.bg3 {
		background-color: #FF8D87;
	}

	.bg4 {
		background-color: #FFC651;
	}

	.ele-nav-li-text {
		margin-top: 20rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.ele-nav-li-num {
		font-size: 30rpx;
		line-height: 40rpx;
	}

	.ele-bot {
		padding: 0rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.ele-bot-top {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #f8f8f8;
	}

	.ele-bot-top-text {
		font-size: 28rpx;
		color: #333;
	}

	.ele-bot-top-text text {
		padding: 0rpx 20rpx;
		box-sizing: border-box;
		color: #007AFF;
	}

	.ele-bot-top-xl {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ele-bot-top-xl-ad1 {
		margin-right: 10rpx;
	}

	.ele-bot-top-xl-ad1,
	.ele-bot-top-xl-ad2 {
		width: 160rpx;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ele-bot-top-xl-ad1 image,
	.ele-bot-top-xl-ad2 image {
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-top: -6rpx;
	}

	.ele-bot-sj {
		background-color: #fff;
	}

	.ele-list-li {
		border: 2rpx solid #f3f3f3;
		margin-top: 30rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}

	.ele-list-li-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.ele-list-li-top-name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
		color: #333;
		font-weight: bolder;
	}

	.ele-list-li-top-studus,
	.ele-list-li-top-studus-le {
		margin-left: 20rpx;
		font-size: 26rpx;
	}

	.ele-list-li-top-studus-le image {
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-top: -4rpx;
	}

	.ele-list-li-num {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ele-list-li-num,
	.ele-list-li-addres {
		font-size: 26rpx;
		color: #999;
		margin-top: 20rpx;
	}

	.le_a {
		color: #4190F5;
	}

	.le_b {
		color: #999999;
	}

	.le_c {
		color: #FF3B30;
	}

	.le_d {
		color: #FD9026;
	}
</style>
