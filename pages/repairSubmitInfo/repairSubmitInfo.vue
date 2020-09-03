<template>
	<view class="container">
		
		<view class="picker-container">
			<!-- 故障属性选择器 -->
				<view class="form-item">
					<view class="label">故障属性</view>
					<view class=""></view>
				</view>
				
				<!-- 配件更换选择器 -->
				<view class="form-item">
					<view class="label">配件更换</view>
					<view class="">{{replaceRange[dataSource.is_replace]}}</view>
				</view>
				
				<!-- 急修建议选择器 -->
				<view class="form-item">
					<view class="label">急修建议</view>
					<view class="">{{proposeRange[dataSource.suggest - 1]}}</view>
				</view>
				
				<!-- 描述 -->
				<view class="form-item border-top">
					<view class="label">备注信息</view>
					<view class=""></view>
				</view>
		</view>
	
		<!-- 视频 -->
		<view class="upload-container">
			<view class="label" style="margin-right: 30rpx;">视频</view>
			<view class="box">
				<view
					class="image-container"
					v-for="(video, idx) in videoList"
					:key="video.id"
					@click="handlePreviewVideo($event, idx)"
				>
					<video
						:id="video.file_url"
						:src="video.file_url"
						:controls="videoControl[idx]"
						:show-center-play-btn="false"
						@fullscreenchange="handleVideoScreenChange($event, idx)"
					></video>
					<view class="mask">
						<image src="../../static/icon/play-video.png" />
					</view>
				</view>
			</view>
		</view>
		
		<!-- 图片 -->
		<view class="upload-container">
			<view class="label" style="margin-right: 30rpx;">图片</view>
			<view class="box">
				<view
					class="image-container"
					v-for="(img, idx) in imageList"
					:key="img.id"
					@click="handlePreview(idx)"
				>
					<image class="preview-image" :src="img.file_url" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		
		<!-- 维保人员签字 -->
		<view class="sign-container">
			<view class="sign-label">维保人员签字</view>
			<image :src="'http://'+dataSource.signature_img_two" />
		</view>
		
		<!-- 安全人员签字 -->
		<view class="sign-container">
			<view class="sign-label">安全人员签字</view>
			<image v-if="hasSafeSign" :src="'http://'+dataSource.signature_img_one" />
			<view v-else class="sign-content">
				<CommonButton
					v-if="dataSource.iden == 2"
					text="签字确认"
					size="small"
					:margin="false"
					@click="handleOpenSignModal($event, 'safe')"
				/>
				<view v-else class="wait-text">等待签字</view>
			</view>
		</view>
		
		<!-- 物业人员签字 -->
		<view class="sign-container">
			<view class="sign-label">物业人员签字</view>
			<image v-if="hasPropertySign" :src="'http://'+dataSource.signature_img_three" />
			<view v-else class="sign-content">
				<CommonButton
					v-if="dataSource.iden == 3"
					text="签字确认"
					size="small"
					:margin="false"
					@click="handleOpenSignModal($event, 'property')"
				/>
				<view v-else class="wait-text">等待签字</view>
			</view>
		</view>
		
		<!-- 签字板弹窗 -->
		<SignBoardModal
			:title="signModal.title"
			:visible="signModal.visible"
			:showCancel="false"
			@close="signModal.visible = false"
			@save="handleGetSignFile"
		/>
	</view>
</template>

<script>
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import SignBoard from '../../components/SignBoard/SignBoard.vue'
	import SignBoardModal from '../../components/SignBoardModal/SignBoardModal.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			CommonButton,
			SignBoard,
			SignBoardModal
		},
		data: () => ({
			orderId: null,
			dataSource: {},
			replaceRange: ['未更换', '更换'],
			proposeRange: ['停梯', '运行'],
			// 选择图片列表
			imageList: [],
			// 选择视频列表
			videoList: [],
			// 视频实例
			videoContext: [],
			// 视频空间是否显示
			videoControl: [],
			signModal: {
				title: '',
				visible: false,
				type: 1
			}
		}),
		computed: {
			hasSafeSign() {
				return Boolean(this.dataSource.signature_img_one)
			},
			hasPropertySign() {
				return Boolean(this.dataSource.signature_img_three)
			}
		},
		methods: {
			// 预览图片
			handlePreview(idx) {
				var _this_ = this
				uni.previewImage({
					current: idx,
					urls: _this_.imageList
				})
			},
			// 预览视频
			handlePreviewVideo(e, idx) {
				this.videoContext[idx].requestFullScreen()
			},
			// 视频全屏切换事件
			handleVideoScreenChange(e, idx) {
				var isFull = e.detail.fullScreen
				if(isFull){
					this.videoContext[idx].play()
					this.videoControl = this.videoControl.map((item, index) => {
						if(index === idx) item = true
						return item
					})
				}
				else {
					this.videoContext[idx].pause()
					this.videoControl = this.videoControl.map((item, index) => {
						if(index === idx) item = false
						return item
					})
				}
			},
			// 弹出签字板弹窗
			handleOpenSignModal(e, type) {
				var title = type == 'safe' ? '安全人员签字' : '物业人员签字'
				var repairType = type == 'safe' ? 1 : 3
				this.signModal = {
					title,
					visible: true,
					type: repairType
				}
			},
			// 关闭签字板弹窗
			handleCloseSignModal() {
				this.signModal.visible = false
			},
			// 提交签字事件
			handleGetSignFile(filePath) {
				var _this_ = this
				uni.uploadFile({
					url: `${this.$store.state.request.url}/api/maint/fault_signature`,
					formData: {
						id: _this_.orderId,
						type: _this_.signModal.type
					},
					name: 'image',
					filePath,
					success: function(res) {
						if(res.code == 1){
							// 将图片更新到页面
							var key = _this_.signModal.type == 1 ? 'signature_img_one' : 'signature_img_three'
							_this_.dataSource[key] = res.data.image
							// 提示成功
							uni.showToast({
								icon: 'success',
								title: '提交成功'
							})
							// 关闭签字板
							_this_.signModal.visible = false
						} else {
							// 提交失败
							uni.showToast({
								icon: 'none',
								title: '提交失败，请稍后再试！'
							})
						}
					}
				})
			}
		},
		onLoad: async function(option) {
			// 拿到工单id
			var { id } = option
			this.orderId = id
			
			// 请求详细数据
			var res = await request.post('/maint/fault_one', {id})
			console.log(res.data.repair)
			this.dataSource = res.data.repair
		}
	}
</script>

<style scoped>
	.container{
		background-color: #F9F9F9;
		height: 100vh;
		overflow-y: scroll;
	}
	
	.picker-container{
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.text-container{
		width: 100%;
		margin-top: 24rpx;
	}
	
	.form-item{
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.form-item + .form-item{
		border-top: solid 1px #F7F7F7;
	}
	.border-top{
		border-top: solid 1px #F7F7F7;
	}
	
	.label{
		flex-shrink: 0;
	}
	.label, .pickered-text, .sign-label{
		font-size: 24rpx;
		color: #000000;
	}
	
	.form-element{
		display: flex;
		align-items: center;
	}
	
	.picker{
		flex: 1;
		height: 90rpx;
		line-height: 90rpx;
		text-align: right;
	}
	
	.picker-icon{
		width: 20rpx;
		height: 20rpx;
		margin-left: 20rpx;
		transform: rotateZ(90deg);
		transform-origin: center;
	}
	
	.textarea{
		width: 100%;
		height: 200rpx;
		font-size: 24rpx;
	}
	
	.sing-confirm{
		height: 274rpx;
		border: solid 1px #F9F9F9;
		border-radius: 6rpx;
	}
	
	/* 上传 */
	.upload-container{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.uploader{
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
	/* van-uploader组件样式 */
	.van-uploader__wrapper{
		justify-content: flex-end !important;
	}
	
	.page{
		padding-top: 100rpx;
	}
	
	.box{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}
	.media-container, .image-container{
		margin: 0 0 20rpx 20rpx;
		width: 120rpx;
		height: 120rpx;
		background-color: #F9F9F9;
		border-radius: 4px;
		position: relative;
	}
	.preview-image, .image-container video{
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	.media-container, .mask{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mask{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.mask image{
		width: 40rpx;
		height: 40rpx;
	}
	
	.remove-button{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: -14rpx;
		right: -14rpx;
		z-index: 2000;
	}
	
	.sign-container{
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.sign-container image{
		width: 100%;
		height: 294rpx;
		border-radius: 5px;
	}
	.sign-content{
		width: 100%;
		height: 294rpx;
		border-radius: 5px;
		border: solid 1px #F9F9F9;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.sign-label{
		height: 80rpx;
		line-height: 80rpx;
	}
	.wait-text{
		font-size: 24rpx;
		color: #999999;
	}
</style>

