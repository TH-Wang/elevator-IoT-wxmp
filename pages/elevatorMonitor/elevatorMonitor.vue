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
						{{ addText }}<image src="../../static/image/wxj/xia.png" mode=""></image>
					</view>
					<view class="ele-bot-top-xl-ad2" @click="changeXq">
						全部地区<image src="../../static/image/wxj/xia.png" mode=""></image>
					</view>
				</view>
				<view class="ele-bot-top-text">
					共找到<text>25条</text>数据
				</view>
			</view>
			<!-- 列表 -->
			<view class="ele-bot-sj">
				<view class="ele-list" v-if="list.length>0">
					<navigator v-for="(item, index) in list" :key="item.index" :url="'/pages/eleInfo/eleInfo?id='+item.id+'&name='+item.name">
						<view class="ele-list-li">
							<view class="ele-list-li-top">
								<view class="ele-list-li-top-name">
									{{ item.name }}
								</view>
								<view class="ele-list-li-top-studus">
									<view class="ele-list-li-top-studus-le le_a" v-if="item.studes == 1"><image src="../../static/icon/feedback/success.png"></image> 在线</view>
									<view class="ele-list-li-top-studus-le le_b" v-else-if="item.studes == 2"><image src="../../static/icon/clear.png"></image> 离线</view>
									<view class="ele-list-li-top-studus-le le_c" v-else-if="item.studes == 3"><image src="../../static/icon/state/fault.png"></image> 故障</view>
									<view class="ele-list-li-top-studus-le le_d" v-else-if="item.studes == 4"><image src="../../static/icon/state/overhaul.png"></image> 检修</view>
								</view>
							</view>
							<view class="ele-list-li-num">
								电梯编号：{{ item.number }}
							</view>
							<view class="ele-list-li-addres">
								电梯地址：{{ item.addrss }}
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
		<van-popup
		  :show="addresShow"
		  position="bottom"
		  @close="onClose"
		>
		<van-area @confirm="isokAdd" @cancel="onClose" :area-list="areaList" />
		</van-popup>
		<van-popup
		  :show="xqShow"
		  position="bottom"
		  @close="onCloseXq"
		>
			<scroll-view scroll-y="true" style="height: 700rpx;">
				<view class="proTitle">请选择小区</view>
				<view class="xq-list">
					<view class="xq-list-li" v-for="(item,index) in xqList" :key="item.index" @click="xqItem(item.id)">
						<view class="xq-list-li-text" :class="item.id == xqCode?'xq-list-li-text_act':''">{{ item.name }}</view>
						<view class="xq-list-li-gx" v-if="item.id == xqCode">
							<van-icon name="success" color="#1989fa" size="18px"/>
						</view>
					</view>
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
	export default {
		components:{
			Null,uniLoadMore
		},
		data() {
			return {
				xqShow: false,
				xqText: '全部地区',
				xqCode: 0,
				addText: '九龙坡区',
				dqCode: 500107,
				addresShow: false,
				classList:{},
				status: 'more',
				title: '暂无数据',
				areaList: {},
				xqList:[
					{id:1,name:'学林佳苑A栋'},
					{id:1,name:'学林佳苑A栋'}
				],
				list:[
					{id:1,studes:1,name:'奔力绿色空间1号楼1号 客梯', number:'230000007 【 23000000723000000711】',addrss:'重庆市九龙坡区渝州路歇台子党校科技大楼9楼'},
					{id:2,studes:2,name:'奔力绿色空间1号楼1号 客梯', number:'230000007 【 23000000723000000711】',addrss:'重庆市九龙坡区渝州路歇台子党校科技大楼9楼'},
					{id:3,studes:3,name:'奔力绿色空间1号楼1号 客梯', number:'230000007 【 23000000723000000711】',addrss:'重庆市九龙坡区渝州路歇台子党校科技大楼9楼'},
					{id:4,studes:4,name:'奔力绿色空间1号楼1号 客梯', number:'230000007 【 23000000723000000711】',addrss:'重庆市九龙坡区渝州路歇台子党校科技大楼9楼'}
				],
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
			that.getClassNx();
			that.getList();
			that.getXqText();
			that.getUserInfo();
		},
		methods: {
			xqItem(id){
				let that = this;
				that.xqCode = id;
			},
			isokAdd(e){
				console.log(e)
				let that = this;
				let value = e.target.values;
				let addText = value[2].name; //value[0].name+'/'+value[1].name+'/'+
				let dqCode = value[2].code;
				that.addText = addText;
				that.dqCode = dqCode;
				that.xqText= '全部地区',
				that.xqCode= 0,
				that.onClose();
			},
			onCloseXq(){
				let that = this;
				that.xqShow = false;
			},
			changeXq(){
				let that = this;
				that.xqShow = true;
			},
			changeAddres(){
				let that = this;
				that.addresShow = true;
			},
			onClose(){
				let that = this;
				that.addresShow = false;
			},
			//获取电梯各类型数量
			getClassNx(){
				let that = this;
				let data = {};
				request.post('/statistical/elevator',data).then((res)=>{
					if(res.code == 1){
						that.classList = res.data
					}
				})
			},
			//获取小区
			getXqText(){
				let that = this;
				let data = {
					area_id: that.dqCode
				};
				request.post('/region/village',data).then((res) =>{
					console.log(res)
				})
			},
			//获取电梯列表
			getList(){
				let that = this;
				let data = {
					province_id:500000,
					limit: 10,
					page: 1,
					village_id: 2
				};
				request.post('/lift/monitoring',data).then((res) => {
					console.log(res)
				})
			},
			getUserInfo(){
				let that = this;
				let data = {
					refresh: 1
				};
				request.post('/user_info',data).then((res) => {
					console.log(res)
				})
			}
		},
		onPullDownRefresh(){
			console.log('下拉开始')
			setTimeout(function () {
				console.log('下拉结束')
			   uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('上拉开始')
			let that = this;
			that.status = 'loading'
			setTimeout(function () {
				console.log('上拉结束')
				that.status = 'noMore'
				console.log(that.status)
			}, 2000);
		},
	}
</script>

<style scoped>
	.proTitle{
		font-size: 28rpx;
		text-align: center;
		padding: 40rpx;
		box-sizing: border-box;
		font-weight: bolder;
		color: #333;
	}
	.xq-list-li{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		border-bottom: 2rpx solid #eee;
	}
	.xq-list-li-text_act{
		color: #1989fa !important;
	}
	.ele-nav{
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 2rpx solid #f8f8f8;
			border-bottom: 20rpx solid #f8f8f8;
		}
		.ele-nav-li{
			width: 140rpx;
			height: 140rpx;
			text-align: center;
			padding: 30rpx 0rpx 20rpx;
			box-sizing: border-box;
			color: #fff;
			border-radius: 10rpx;
		}
		.bg1{
			background-color: #5E9BE9;
		}
		.bg2{
			background-color: #21CFCF;
		}
		.bg3{
			background-color: #FF8D87;
		}
		.bg4{
			background-color: #FFC651;
		}
		.ele-nav-li-text{
			margin-top: 20rpx;
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.ele-nav-li-num{
			font-size: 30rpx;
			line-height: 40rpx;
		}
		.ele-bot{
			padding: 0rpx 30rpx  30rpx;
			box-sizing: border-box;
		}
		.ele-bot-top{
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #f8f8f8;
		}
		.ele-bot-top-text{
			font-size: 28rpx;
			color: #333;
		}
		.ele-bot-top-text text{
			padding: 0rpx 20rpx;
			box-sizing: border-box;
			color: #007AFF;
		}
		.ele-bot-top-xl{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.ele-bot-top-xl-ad1{
			margin-right: 10rpx;
		}
		.ele-bot-top-xl-ad1,.ele-bot-top-xl-ad2{
			width: 160rpx;
			font-size: 28rpx;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.ele-bot-top-xl-ad1 image,.ele-bot-top-xl-ad2 image{
			margin-left: 10rpx;
			width: 30rpx;
			height: 30rpx;
			vertical-align: middle;
			margin-top: -6rpx;
		}
		.ele-bot-sj{
			background-color: #fff;
		}
		.ele-list-li{
			border: 2rpx solid #f3f3f3;
			margin-top: 30rpx;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
		}
		.ele-list-li-top{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.ele-list-li-top-name{
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 28rpx;
			color: #333;
			font-weight: bolder;
		}
		.ele-list-li-top-studus,.ele-list-li-top-studus-le{
			margin-left: 20rpx;
			font-size: 26rpx;
		}
		.ele-list-li-top-studus-le image{
			margin-right: 10rpx;
			width: 30rpx;
			height: 30rpx;
			vertical-align: middle;
			margin-top: -4rpx;
		}
		.ele-list-li-num{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.ele-list-li-num,.ele-list-li-addres{
			font-size: 26rpx;
			color: #999;
			margin-top: 20rpx;
		}
		.le_a{
			color: #4190F5;
		}
		.le_b{
			color: #999999;
		}
		.le_c{
			color: #FF3B30;
		}
		.le_d{
			color: #FD9026;
		}
</style>
