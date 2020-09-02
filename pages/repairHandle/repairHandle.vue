<template>
	<view class="container">
		
		<view class="picker-container">
			<!-- 故障属性选择器 -->
				<view class="form-item">
					<view class="label">故障属性</view>
					<picker class="picker" :value="propPickerIndex" :range="propRange" @change="handlePropPickerChange">
						<text class="pickered-text">{{propRange[propPickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 配件更换选择器 -->
				<view class="form-item">
					<view class="label">配件更换</view>
					<picker class="picker" :value="replacePickerIndex" :range="replaceRange" @change="handleSafePickerChange">
						<text class="pickered-text">{{replaceRange[replacePickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 急修建议选择器 -->
				<view class="form-item">
					<view class="label">急修建议</view>
					<picker class="picker" :value="proposePickerIndex" :range="proposeRange" @change="handleTrappedPickerChange">
						<text class="pickered-text">{{proposeRange[proposePickerIndex]}}</text>
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
			<view class="label" style="margin-right: 30rpx;">图片</view>
			<view class="box">
				<view
					class="image-container"
					v-for="(img, idx) in imageList"
					:key="img.id"
					@click="handlePreview(idx)"
				>
					<image class="preview-image" :src="img.file_url" mode="aspectFill"></image>
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
		<view class="sign-container">
			<view class="sign-label">签字</view>
			<SignBoard ref="sign" />
		</view>
		
		<!-- 提交按钮 -->
		<CommonButton text="确认提交" @click="handleSubmit" />
		
	</view>
</template>

<script>
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import SignBoard from '../../components/SignBoard/SignBoard.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			CommonButton,
			SignBoard
		},
		data: () => ({
			orderId: null,
			attrs: [],
			propPickerIndex: 0,
			replaceRange: ['未更换', '更换'],
			replacePickerIndex: 0,
			proposeRange: ['停梯', '运行'],
			proposePickerIndex: 0,
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
		computed: {
			propRange() {
				return this.attrs.map(i=>i.name)
			},
			propId() {
				return this.attrs.map(i=>i.id)
			}
		},
		methods: {
			// 选择故障属性
			handlePropPickerChange(e) {
				this.propPickerIndex = e.target.value
			},
			// 选择是否更换配件
			handleSafePickerChange(e) {
				this.replacePickerIndex = e.target.value
			},
			// 选择急修建议
			handleTrappedPickerChange(e) {
				this.proposePickerIndex = e.target.value
			},
			// 选择图片
			handleChooseImage() {
				var _this_ = this
				uni.chooseImage({
					count: 1,
					success(res) {
						var filePath = res.tempFilePaths[0]
						uni.showLoading({title: '正在上传...'})
						// 上传
						uni.uploadFile({
							url: `${_this_.$store.state.request.url}/api/upload_file`,
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								"token": uni.getStorageSync('token')
							},
							formData: {
								order_id: _this_.orderId,
								file_type: 3,
								file_belong: 1
							},
							success(res) {
								var result = JSON.parse(res.data)
								console.log(result)
								if(result.code == 1) {
									_this_.imageList = result.data
								}
								else {
									uni.showModal({
										title: '上传失败，请稍后重试',
										showCancel: false
									})
								}
							},
							fail(err) {
								uni.showModal({
									title: '上传失败，请稍后重试',
									showCancel: false
								})
							},
							complete() {
								uni.hideLoading()
							}
						})
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
			handleImageRemove: async function(e, idx) {
				var id = this.imageList[idx].id
				await request.post('/upload_file/del', { id })
				this.imageList.splice(idx, 1)
			},
			// 选择视频
			handleChooseVideo() {
				var _this_ = this
				uni.chooseVideo({
					success(res) {
						var path = res.tempFilePath
						uni.showLoading({title: '上传中...'})
						// 上传
						uni.uploadFile({
							url: `${_this_.$store.state.request.url}/api/upload_file`,
							filePath: path,
							name: 'file',
							header: {
								"token": uni.getStorageSync('token')
							},
							formData: {
								order_id: _this_.orderId,
								file_type: 1,
								file_belong: 1
							},
							success: function(res) {
								// _this_.videoList.push(res.data[0])
								// _this_.videoContext.push(uni.createVideoContext(path))
								// _this_.videoControl.push(false)
								var result = JSON.parse(res.data)
								console.log(result)
								if(result.code == 1){
									var dataList = result.data
									_this_.videoList = dataList
									_this_.videoContext = dataList.map(item => {
										return uni.createVideoContext(item.file_url)
									})
									_this_.videoControl = new Array(dataList.length).fill(false)
								}
								else {
									uni.showModal({
										title: '上传失败，请稍后重试',
										showCancel: false
									})
								}
							},
							fail: function(err) {
								uni.showModal({
									title: '上传失败，请稍后重试',
									showCancel: false
								})
							},
							complete: function() {
								uni.hideLoading()
							}
						})
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
			handleVideoRemove: async function(e, idx) {
				var id = this.videoList[idx].id
				await request.post('/upload_file/del', { id })
				this.videoList.splice(idx, 1)
				this.videoContext.splice(idx, 1)
				this.videoControl.splice(idx, 1)
			},
			// 提交
			handleSubmit: async function() {
				var _this_ = this
				var data = {
					id: _this_.orderId,
					content: _this_.describe,
					type: 4,
					fault_attr: _this_.propId[_this_.propPickerIndex],
					is_replace: _this_.replacePickerIndex + 1,
					suggest: _this_.proposePickerIndex
				}
				var filePath = await this.$refs.sign.finish()
				uni.showLoading({title: '提交中...'})
				uni.uploadFile({
					url: `${_this_.$store.state.request.url}/api/maint/fault_submit`,
					filePath: filePath,
					name: 'image',
					header: {
						"token": uni.getStorageSync('token'),
						"Content-Type": "multipart/form-data"
					},
					formData: data,
					success: function(res) {
						var result = JSON.parse(res.data)
						console.log(result)
						if(result.code == 1) {
							uni.showModal({
								title: '提交成功',
								showCancel: false,
								success(res) {
									uni.redirectTo({ url: '/pages/repairDetail/repairDetail?id=' + _this_.orderId })
								}
							})
						} else {
							console.log('----收到response----')
							uni.showModal({
								showCancel: false,
								title: '提交失败，请稍后重试'
							})
						}
					},
					fail: function(err) {
						console.log('----请求失败----')
						uni.showModal({
							showCancel: false,
							title: '提交失败，请稍后重试'
						})
					},
					complete: function() {
						uni.hideLoading()
					}
				})
			},
		},
		onLoad: async function(option) {
			// 拿到工单id
			var { id } = option
			this.orderId = id
			
			// 请求故障属性
			var res = await request.post('/maint/fault_attr')
			this.attrs = res.data
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
	.sign-label{
		height: 80rpx;
		line-height: 80rpx;
	}
</style>

