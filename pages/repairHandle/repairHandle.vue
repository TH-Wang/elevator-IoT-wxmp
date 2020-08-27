<template>
	<view class="container">
		
		<view class="picker-container">
			<!-- 故障属性选择器 -->
				<view class="form-item">
					<view class="label">故障属性</view>
					<picker class="picker" :value="porpPickerIndex" :range="propRange" @change="handlePropPickerChange">
						<text class="pickered-text">{{propRange[porpPickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 配件更换选择器 -->
				<view class="form-item">
					<view class="label">配件更换</view>
					<picker class="picker" :value="safePickerIndex" :range="safeRange" @change="handleSafePickerChange">
						<text class="pickered-text">{{safeRange[safePickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 急修建议选择器 -->
				<view class="form-item">
					<view class="label">急修建议</view>
					<picker class="picker" :value="trappedPickerIndex" :range="trappedRange" @change="handleTrappedPickerChange">
						<text class="pickered-text">{{trappedRange[trappedPickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 描述 -->
				<view class="text-container">
					<view class="form-item border-top">
						<view class="label">备注信息</view>
					</view>
					<textarea class="textarea" v-model="describe" placeholder="请在这里输入故障描述..."></textarea>
				</view>
		</view>
	
		<!-- 视频 -->
		<view class="upload-container">
			<view class="label" style="margin-right: 30rpx;">视频</view>
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
					
				<view class="media-container" @click="handleChooseVideo">
					<van-icon name="plus" size="60rpx" color="#DEDEDE" />
				</view>
			</view>
		</view>
		
		<!-- 图片 -->
		<view class="upload-container">
			<view class="label" style="margin-right: 30rpx;">视频</view>
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
				<view class="media-container" @click="handleChooseImage">
					<van-icon name="plus" size="60rpx" color="#DEDEDE" />
				</view>
			</view>
		</view>
		
		<!-- 签字确认 -->
		<view class="picker-container">
			<view class="text-container">
				<view class="form-item">
					<view class="label">签字确认</view>
				</view>
				<view class="sing-confirm"></view>
			</view>
		</view>
		
		<!-- 提交按钮 -->
		<CommonButton text="确认提交" />
		
	</view>
</template>

<script>
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	
	export default {
		components: {
			CommonButton
		},
		data: () => ({
			propRange: [],
			porpPickerIndex: 0,
			safeRange: ['一级', '二级', '三级', '四级', '五级'],
			safePickerIndex: 0,
			trappedRange: ['是', '否'],
			trappedPickerIndex: 0,
			describe: '',
			// 选择图片列表
			imageList: [],
			// 选择视频列表
			videoList: [],
			// 视频实例
			videoContext: [],
			// 视频空间是否显示
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
		onLoad: async function() {
			var res = await request.post('/maint/fault_attr')
			console.log(res)
			this.propRange = res.data.map(item => item.name)
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
	.label, .pickered-text{
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
</style>

