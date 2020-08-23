<template>
	<view class="contsf">
		<view class="wbxmbox">
			<view class="wblet">维保项目</view>
			<view class="">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value2" :options="option2" />
				</van-dropdown-menu>
			</view>
		</view>
		<view class="typebox">
			<view class="headtype">当前分类找到<text>5</text>条结果</view>
			
			
			<view class="jiuccont" v-for="(item,index) of datalist" v-key="index" @click="workdel">
				<view class="jchead">
					<view class="jeadtop">
						<view class="helettxt">{{item.title}}</view>
						<view class="rigthimg" v-if="item.status==1">
							<image src="../../static/icon/feedback/success.png"></image>
							<view class="successwc">完成</view>
						</view>
						<view class="rigthimg" v-if="item.status==2">
							<image src="../../static/icon/feedback/error.png"></image>
							<view class="nohege">不合格</view>
						</view>
						<view class="rigthimg" v-if="item.status==3">
							<image src="../../static/icon/feedback/error.png"></image>
							<view class="jianxtxt">检修</view>
						</view>
					</view>
					<view class="numhome">{{item.cont}}</view>
				</view>
				<view class="imglist">
					<view class="imgbos" @click.stop="imgqhbtn(index)">
						<view class="lettxtimg">图片</view>
						<view class="numimg">{{item.imglist.length}}
							<van-icon name="add-o" class="addioc" />
						</view>
					</view>
					<view class="imfcont" v-show="item.imgfal">
						<van-uploader v-model="fileList" :after-read="afterRead" multiple />
						<van-icon name="arrow-up" class="topimg" @click.stop="imgqhbtn(index)" />
					</view>
				</view>
				<view class="imglist">
					<view class="imgbos" @click.stop="vidqhbtn(index)">
						<view class="lettxtimg">视频</view>
						<view class="numimg">{{item.vdio.length}}
							<van-icon name="add-o" class="addioc" />
						</view>
					</view>
					<view class="imfcont" v-show="item.vidofal">
						<van-uploader v-model="fileList" :preview-image="false"  :after-read="opvideobtn" multiple />
						<van-icon name="arrow-up" class="topimg" @click.stop="vidqhbtn(index)" />
					</view>
				</view>
				<view class="imglist">
					<view class="imgbos">
						<view class="lettxtimg">备注</view>
						<view class="marktxt">{{item.mark}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="footbtn">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				false:false,
				value2: 'a',
				option2: [{
						text: '默认排序',
						value: 'a'
					},
					{
						text: '好评排序',
						value: 'b'
					},
					{
						text: '销量排序',
						value: 'c'
					},
				],
				datalist: [{
						title: '层门门锁电气触点',
						status: '1',
						cont: '房间号胜多负少的束带结发圣诞房间号胜',
						imglist: [],
						vdio: [],
						mark: '递四方速递扣干净市分公司倒海翻江第三方',
						imgfal: true,
						vidofal: false,
					},
					{
						title: '层门门锁电气触点',
						status: '2',
						cont: '房间号胜多负少的束带结发圣诞房间号胜',
						imglist: [],
						vdio: [],
						mark: '递四方速递扣干净市分公司倒海翻江第三方',
						imgfal: false,
						vidofal: false,
					}, {
						title: '层门门锁电气触点',
						status: '3',
						cont: '房间号胜多负少的束带结发圣诞房间号胜',
						imglist: [],
						vdio: [],
						mark: '递四方速递扣干净市分公司倒海翻江第三方',
						imgfal: false,
						vidofal: false,
					}, {
						title: '层门门锁电气触点',
						status: '3',
						cont: '房间号胜多负少的束带结发圣诞房间号胜',
						imglist: [],
						vdio: [],
						mark: '递四方速递扣干净市分公司倒海翻江第三方',
						imgfal: false,
						vidofal: false,
					},
				],
				fileList: []
			}
		},
		methods: {
			workdel(){
				uni.navigateTo({
					url: '/pages/workdel/workdel'
				})
			},
			// 上传视频
			opvideobtn(res) {
				console.log(res)
				uni.chooseVideo({
					maxDuration: 60,
					count: 1,
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: ['album'],
					success: (responent) => {
						let videoFile = responent.tempFilePath;
						console.log(responent)
					}
				})
			},
			// 图片的切换
			imgqhbtn(index) {
				this.datalist[index].imgfal = !this.datalist[index].imgfal
			},
			// 视频的切换
			vidqhbtn(index) {
				this.datalist[index].vidofal = !this.datalist[index].vidofal
			},
			// 上传图片
			afterRead(event) {
				console.log(event)
			},
		}
	}
</script>

<style>
	.footbtn {
		width: 100%;
		height: 95rpx;
		background: #0088FF;
		color: 36rpx;
		color: #FFFFFF;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topimg {
		color: #999999;
	}

	.marktxt {
		font-size: 24rpx;
		color: #666666;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right;
	}

	.topimg {
		font-size: 34rpx;
	}

	.imglist {
		border-bottom: 1rpx solid #EEEEEE;
	}

	.imfcont {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding: 30rpx 0;

	}

	.van-uploader__upload {
		margin-bottom: 0 !important;
	}

	.lettxtimg {
		font-size: 24rpx;
	}

	.numimg {
		display: flex;
		align-items: center;
		font-optical-sizing: 24rpx;
	}

	.imgbos {
		height: 85rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.numhome {
		font-size: 24rpx;
		color: #666666;
		margin-top: 20rpx;
	}

	.nohege {
		font-size: 24rpx;
		color: #FF3B30;
		margin-left: 10rpx;
	}

	.jianxtxt {
		font-size: 24rpx;
		color: #FD9026;
		margin-left: 10rpx;
	}

	.successwc {
		font-size: 24rpx;
		color: #4190F5;
		margin-left: 10rpx;
	}

	.rigthimg {
		display: flex;
		align-items: center;
	}

	.rigthimg image {
		width: 30rpx;
		height: 30rpx;
	}

	.helettxt {
		font-size: 28rpx;
		font-weight: bold;
	}

	.jeadtop {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.jchead {
		height: 155rpx;
		padding-top: 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
		box-sizing: border-box;
	}

	.jiuccont {
		background: #ffffff;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
	}

	.typebox {
		padding: 0 30rpx;
		padding-bottom: 110rpx !important;
	}

	.headtype {
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: #999999;
	}

	.headtype text {
		margin: 5rpx 0;
		display: inline-block;
		color: #4190F5;
	}

	.addioc {
		color: #4190F5;
		font-size: 36rpx;
		margin-left: 20rpx;
	}

	.wblet {
		font-size: 28rpx;
		font-weight: bolder;
	}

	.contsf {
		background: #F9F9F9;
		min-height: 100vh;
	}

	.wbxmbox {
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
	}
</style>
