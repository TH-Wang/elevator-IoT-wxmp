<template>
	<view class="container">
		<view class="header">
			<view class="header-title">维保项目</view>
			<!-- 下拉菜单 -->
			<van-dropdown-menu>
				<van-dropdown-item :value="menuValue" :options="menuOptions" @change="handleMenuChange" />
			</van-dropdown-menu>
		</view>
		<view class="main-container" v-if="dataList.length>=1">
			<view class="total-count">当前分类找到<text>{{dataList.length}}</text>条结果</view>
			
			<!-- 维保项目 -->
			<view
				class="item-container"
				v-for="(item, index) in dataList"
				:key="item.id"
			>
				<!-- 顶部 -->
				<view class="item-header">
					<view class="item-title">{{item.project_content}}</view>
					<!-- 项目维保进度选择 -->
					<picker
						v-if="authority"
						class="picker"
						:value="Number(item.pill_type) - 1"
						:range="stateRange"
						@change="handleStatePickerChange($event, item)"
					>
						<van-icon v-if="(item.pill_type-1)%2 == 0" name="passed" size="30rpx" color="#4190F5" />
						<van-icon v-else name="warning-o" size="30rpx" color="#FD9026" />
						<text
							class="pickered-text"
							:style="'color:'+((item.pill_type-1)%2 == 0 ? '#4190F5' : '#FD9026')"
						>
							{{stateRange[Number(item.pill_type) - 1]}}
						</text>
						<!-- 选择器下拉按钮 -->
						<van-icon
							name="arrow-down"
							size="26rpx"
							color="#999999"
							style="margin-left: 6rpx;"
						/>
					</picker>
					<!-- 如果没有操作权限，则只能预览 -->
					<text
						v-else
						class="pickered-text"
						:style="'color:'+((item.pill_type-1)%2 == 0 ? '#4190F5' : '#FD9026')"
					>
						{{stateRange[Number(item.pill_type) - 1]}}
					</text>
				</view>
				<!-- 描述 -->
				<view class="item-description">
					{{item.project_syn}}
				</view>
				<!-- 图片列表 -->
				<view class="mediaList">
					<view class="item-flex-box" @click="handleToggleImageBox($event, index)">
						<view class="item-label-text">图片</view>
						<view class="item-media-count">
							<text>×{{item.image.length}}</text>
							<van-icon name="add-o" color="#4190F5" size="30rpx" />
						</view>
					</view>
					<!-- 图片容器 -->
					<view class="item-media-drop-container" v-if="imageShowList[index]">
						<view class="item-media-container">
							<!-- 图片列表 -->
							<view
								class="image-container"
								v-for="(img, idx) in item.image"
								:key="img.id"
								@click="handlePreviewImage($event, index, idx)"
							>
								<image class="preview-image" :src="'http://' + img.file_url" mode="aspectFill"></image>
								<!-- 删除图片 -->
								<image
									v-if="authority"
									class="remove-button"
									src="../../static/icon/remove.png"
									@click="handleRemoveImage($event, item.id, img.id, idx)"
								/>
							</view>
							<!-- 添加图片 -->
							<view
								v-if="authority"
								class="media-container"
								@click="handleChooseImage($event, item.id)"
							>
								<van-icon name="plus" size="60rpx" color="#DEDEDE" />
							</view>
						</view>
						<!-- 隐藏媒体列表按钮 -->
						<view class="item-media-dropup" @click="handleHideImageBox($event, index)">
							<van-icon name="arrow-up" size="30rpx" color="#999999" />
						</view>
					</view>
				</view>
				<!-- 视频列表 -->
				<view class="mediaList">
					<!-- 视频label -->
					<view class="item-flex-box" @click="handleToggleVideoBox($event, index)">
						<view class="item-label-text">视频</view>
						<view class="item-media-count">
							<text>×{{item.video.length}}</text>
							<van-icon name="add-o" color="#4190F5" size="30rpx" />
						</view>
					</view>
					<!-- 视频容器 -->
					<view class="item-media-drop-container" v-if="videoShowList[index]">
						<view class="item-media-container">
							<!-- 视频列表 -->
							<view
								class="image-container"
								v-for="(video, idx) in item.video"
								:key="video.id"
								@click="handlePreviewVideo($event, index, idx)"
							>
								<video
									:id="video.file_url"
									:src="'http://' + video.file_url"
									:controls="video.controls"
									:show-center-play-btn="false"
									@fullscreenchange="handleVideoScreenChange($event, index, idx)"
								/>
								<view class="mask">
									<image src="../../static/icon/play-video.png" />
								</view>
								<!-- 删除视频 -->
								<image
									v-if="authority"
									class="remove-button"
									src="../../static/icon/remove.png"
									@click="handleVideoRemove($event, item.id, video.id, idx)"
								/>
							</view>
							<!-- 添加视频 -->
							<view
								v-if="authority"
								class="media-container"
								@click="handleChooseVideo($event, item.id, index)"
							>
								<van-icon name="plus" size="60rpx" color="#DEDEDE" />
							</view>
						</view>
						<!-- 隐藏媒体列表按钮 -->
						<view class="item-media-dropup" @click="handleHideVideoBox($event, index)">
							<van-icon name="arrow-up" size="30rpx" color="#999999" />
						</view>
					</view>
				</view>
				<!-- 备注 -->
				<view class="item-flex-box">
					<view class="item-label-text">备注</view>
					<input
						v-if="authority"
						class="item-remark"
						type="text"
						v-model="item.pill_remark"
						placeholder="请输入备注信息"
						@blur="handleEditRemark($event, item)"
						@confirm="handleEditRemark($event, item)"
					/>
					<view v-else class="item-remark">{{item.pill_remark ? item.pill_remark : ''}}</view>
				</view>
			</view>
			
			<!-- 占位 -->
			<view style="height: 30rpx;"></view>
			
		</view>
		
	</view>
</template>

<script>
	import request from '../../service/request.js'
	
	export default {
		components: {
			
		},
		data() {
			return {
				maintId: null,
				authority: false,
				menuOptions: [],
				menuValue: 0,
				dataList: [],
				stateRange: ['完成', '未处理', '已处理并更换零件', '没有该项'],
				imageShowList: [],
				videoShowList: []
			}
		},
		onLoad: async function(option) {
			var { id, maint_id, auth } = option
			this.maintId = maint_id
			this.authority = Boolean(Number(auth))
			await this.requestList(id, maint_id)
			await this.requestFirstList(id, maint_id)
		},
		methods: {
			// 请求一级列表
			requestFirstList: async function(id, maint_id) {
				var res = await request.post('/maint/main_xm', { maint_id })
				this.menuOptions = res.data.map(item => ({
					text: item.name,
					value: item.id
				}))
				this.menuValue = Number(id)
			},
			// 请求维保项目列表
			requestList: async function(id, maint_id){
				var res = await request.post('/maint/main_info_list', { id, maint_id, type: 0, })
				this.dataList = res.data.map(item => {
					// 视频实例和视频控件
					item.video = item.video.map(el => {
						el.context = uni.createVideoContext(el.file_url)
						el.controls = false
						return el
					})
					return item
				})
				// 显示项目的图片列表
				this.imageShowList = new Array(res.data.length).fill(false)
				// 显示项目的视频列表
				this.videoShowList = new Array(res.data.length).fill(false)
			},
			// 下拉菜单发生改变
			handleMenuChange: async function(e) {
				var firstId = e.detail
				console.log(firstId)
				this.menuValue = firstId
				uni.showLoading({
					title: '加载中...'
				})
				try{
					await this.requestList(firstId, this.maintId)
				}catch(e){
					console.log(e)
				}
				uni.hideLoading()
			},
			// 选择项目的维保状态
			handleStatePickerChange: async function(e, {id, pill_remark}) {
				var type = Number(e.detail.value) + 1
				await this.handleSubmitProject(id, type, pill_remark)
			},
			// 提交维保项目
			handleSubmitProject: async function(id, pill_type, pill_remark) {
				var _this_ = this
				var res = await request.post('/maint/present', {
					id: id,
					bill_id: _this_.maintId,
					pill_type,
					pill_remark
				})
				this.dataList = this.dataList.map(item => {
					if(item.id == id) {
						item.pill_type = pill_type
						item.pill_remark = pill_remark
					}
					return item
				})
			},
			// 修改维保项目的备注信息
			handleEditRemark: async function(e, {id, pill_type, pill_remark}) {
				var _this_ = this
				var res = await request.post('/maint/present', {
					id: id,
					bill_id: _this_.maintId,
					pill_type,
					pill_remark
				})
				if(res.code == 1) {
					uni.showToast({
						title: '已提交',
						icon: 'success'
					})
				}
			},
			// 展开图片列表
			handleToggleImageBox(e, index) {
				this.imageShowList.splice(index, 1, !this.imageShowList[index])
			},
			// 展开视频列表
			handleToggleVideoBox(e, index) {
				this.videoShowList.splice(index, 1, !this.videoShowList[index])
			},
			// 隐藏图片列表
			handleHideImageBox(e, index) {
				this.imageShowList.splice(index, 1, false)
			},
			// 隐藏视频列表
			handleHideVideoBox(e, index) {
				this.videoShowList.splice(index, 1, false)
			},
			// 上传图片
			handleChooseImage: function(e, id) {
				var _this_ = this
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: async function({ tempFilePaths }) {
						var res = await request.upload({
							url: "/upload_file",
							name: "file",
							filePath: tempFilePaths[0],
							data: {
								order_id: id,
								file_type: 3,
								file_belong: 2
							}
						})
						console.log(res.data)
						// 更新图片列表
						_this_.dataList = _this_.dataList.map((item) => {
							if(item.id == id) {
								item.image = res.data
							}
							return item
						})
					}
				})
			},
			// 删除图片
			handleRemoveImage: async function(e, projectId, fileId, fileIdx) {
				var res = await request.post('/upload_file/del', {id: fileId})
				if(res.code == 1) {
					this.dataList = this.dataList.map(item => {
						if(item.id == projectId) {
							item.image.splice(fileIdx, 1)
						}
						return item
					})
				} else {
					uni.showToast({
						title: '删除失败，请稍后再试',
						icon: 'none'
					})
				}
			},
			// 预览图片
			handlePreviewImage: function(e, projectIndex, fileIdx) {
				console.log(projectIndex, fileIdx)
				var _this_ = this
				uni.previewImage({
					current: fileIdx,
					urls: _this_.dataList[projectIndex].image.map(i=>`http://${i.file_url}`)
				})
			},
			// 上传视频
			handleChooseVideo: async function(e, id, index) {
				var _this_ = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['album', 'camera'],
					success: async function({ tempFilePath }) {
						var res = await request.upload({
							url: "/upload_file",
							name: "file",
							filePath: tempFilePath,
							data: {
								order_id: id,
								file_type: 1,
								file_belong: 2
							}
						})
						_this_.dataList = _this_.dataList.map(item => {
							if(item.id == id) {
								item.video = res.data.map(el => {
									el.context = uni.createVideoContext(el.file_url)
									el.controls = false
									return el
								})
							}
							return item
						})
					}
				})
			},
			// 删除视频
			handleVideoRemove: async function(e, projectId, fileId, fileIdx) {
				var res = await request.post('/upload_file/del', {id: fileId})
				if(res.code == 1) {
					this.dataList = this.dataList.map(item => {
						if(item.id == projectId) {
							item.video.splice(fileIdx, 1)
						}
						return item
					})
				} else {
					uni.showToast({
						title: '删除失败，请稍后再试',
						icon: 'none'
					})
				}
			},
			// 预览视频
			handlePreviewVideo: function(e, projectIndex, fileIdx) {
				this.dataList[projectIndex].video[fileIdx].context.requestFullScreen({direction: 0})
			},
			// 监听视频全屏事件，切换视频原生控件的状态
			handleVideoScreenChange: function(e, projectIndex, fileIdx) {
				var isFull = e.detail.fullScreen
				var currentVideo = this.dataList[projectIndex].video[fileIdx]
				if(isFull) {
					currentVideo.controls = true
					currentVideo.context.play()
				} else {
					currentVideo.controls = false
					currentVideo.context.pause()
				}
			}
		}
	}
</script>

<!-- 主要样式 -->
<style scoped>
	.container{
		background-color: #f9f9f9;
	}
	
	/* 页面头部 */
	.header {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 0 30rpx;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.header-title {
		font-size: 28rpx;
		font-weight: bold;
	}
	
	/* 页面主体 */
	.main-container {
		padding: 0 30rpx;
	}
	/* 总计数量 */
	.total-count {
		margin: 20rpx 0 30rpx 0;
		font-size: 22rpx;
		color: #999999;
	}

	.total-count text {
		margin: 0rpx 5rpx;
		color: #4190F5;
	}
	
	/* 每个维保项目的容器 */
	.item-container {
		background: #ffffff;
		padding: 30rpx 30rpx 10rpx 30rpx;
		margin-bottom: 20rpx;
		border-radius: 6rpx;
	}
	
	.item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.item-title {
		flex: 1;
		margin-right: 20rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	
	.picker{
		flex-shrink: 1;
		display: flex;
		align-items: center;
	}
	van-icon{
		vertical-align: middle;
	}
	.pickered-text{
		font-size: 24rpx;
		margin-left: 10rpx;
	}
	
	.item-description {
		font-size: 24rpx;
		color: #666666;
		padding-top: 20rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f9f9f9;
	}

	.mediaList {
		border-bottom: 1rpx solid #f9f9f9;
	}
	
	.item-media-drop-container{
		display: flex;
		align-items: center;
	}
	
	.item-media-dropup{
		flex-shrink: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 30rpx;
		height: 100%;
	}
	
	.item-media-container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding: 30rpx 0;
	}

	.item-label-text {
		font-size: 24rpx;
		color: #000000;
		flex-shrink: 1;
		margin-right: 4rpx;
	}

	.item-media-count {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #000000;
	}
	.item-media-count text{
		margin-right: 20rpx;
	}

	.item-flex-box {
		height: 85rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item-remark {
		font-size: 24rpx;
		color: #666666;
		flex: 1;
		text-align: right;
	}
</style>

<!-- 媒体控件样式 -->
<style scoped>
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
