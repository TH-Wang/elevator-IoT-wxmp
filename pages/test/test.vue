<template>
	<view class="page">
		<!-- 选择图片 -->
		<view class="box">
			<view
				class="image-container"
				v-for="(img, idx) in imageList"
				:key="img"
				@click="handlePreview(idx)"
			>
				<image class="preview-image" :src="img" mode="aspectFill"></image>
				<image
					class="remove-button"
					src="../../static/icon/remove.png"
					@click="handleImageRemove($event, idx)"
				/>
			</view>
			<view class="container" @click="handleChooseImage">
				
			</view>
		</view>
		<!-- 选择视频 -->
		<view class="box">
			<view
				class="image-container"
				v-for="(video, idx) in videoList"
				:key="video"
				@click="handlePreviewVideo($event, idx)"
			>
				<video
					:id="video"
					:src="video"
					:controls="videoControl[idx]"
					:show-center-play-btn="false"
					@fullscreenchange="handleVideoScreenChange($event, idx)"
				></video>
				<view class="mask">
					<image src="../../static/icon/play-video.png" />
				</view>
				<image
					class="remove-button"
					src="../../static/icon/remove.png"
					@click="handleVideoRemove($event, idx)"
				/>
			</view>
				
			<view class="container" @click="handleChooseVideo">
				<van-icon name="plus" size="60rpx" color="#DEDEDE" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: () => ({
			imageList: [],
			videoList: [],
			videoContext: [],
			videoControl: []
		}),
		methods: {
			// 选择图片
			handleChooseImage() {
				var _this_ = this
				uni.chooseImage({
					count: 1,
					success(res) {
						_this_.imageList.push(res.tempFilePaths[0])
					}
				})
			},
			// 预览图片
			handlePreview(idx) {
				var _this_ = this
				uni.previewImage({
					current: idx,
					urls: _this_.imageList
				})
			},
			// 删除图片
			handleImageRemove(e, idx) {
				this.imageList.splice(idx, 1)
			},
			// 选择视频
			handleChooseVideo() {
				var _this_ = this
				uni.chooseVideo({
					success(res) {
						var path = res.tempFilePath
						_this_.videoList.push(path)
						_this_.videoContext.push(uni.createVideoContext(path))
						_this_.videoControl.push(false)
					}
				})
			},
			// 预览视频
			handlePreviewVideo(e, idx) {
				console.log(this.videoContext)
				console.log(this.videoControl)
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
			// 删除视频
			handleVideoRemove(e, idx) {
				this.videoList.splice(idx, 1)
				this.videoContext.splice(idx, 1)
				this.videoControl.splice(idx, 1)
			}
		},
		onLoad() {
			// this.videoContext = uni.createVideoContext('video')
		}
	}
</script>

<style scoped>
	.page{
		padding-top: 100rpx;
	}
	
	.box{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}
	.container, .image-container{
		margin: 0 0 20rpx 20rpx;
		width: 80px;
		height: 80px;
		background-color: #F9F9F9;
		border-radius: 4px;
		position: relative;
	}
	.preview-image, .image-container video{
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	.container, .mask{
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
</style>