<template>
	<view class="container">
		<transition name="fade">
			<view
				class="modal-container"
				v-if="visible"
				@click="handleClose"
				id="box"
			>
				<view class="modal-card" id="card">
					<!-- 头部搜索 -->
					<view class="header">
						<view class="title">搜索电梯</view>
						<ModalSearch class="modal-search" @search="handleSearchLift" />
					</view>
					<!-- 列表 -->
					<view class="eva-list">
						<Empty
							v-if="liftList.length === 0"
							title="可通过电梯编码、名称、地址进行搜索"
							style="font-size: 24rpx;"
						/>
						
						<view
							v-else
							v-for="lift in liftList"
							:key="lift.elevator_id"
							class="eva-item"
						>
							<view class="eva-name">
								<text>{{lift.name}}</text>
								<image
									class="selected-icon"
									v-show="liftId === lift.elevator_id"
									src="../../static/icon/feedback/success.png"
								/>
							</view>
							<view class="eva-code">编号：{{lift.elevator_number}}</view>
							<view class="eva-address">地址：{{lift.address}}</view>
							<!-- 通道选择 -->
							<view class="channel-picker">
								<view class="label">数据通道</view>
								<picker
									class="picker"
									:value="lift.channelIndex"
									:range="channelRange"
									@change="handlechannelPickerChange($event, lift.elevator_id)"
								>
									<text class="pickered-text">{{channelRange[lift.channelIndex]}}</text>
									<image class="picker-icon" src="../../static/icon/right.png" />
								</picker>
							</view>
							<!-- 连接状态 -->
							<view class="state">
								<text>服务器连接</text>
								<image src="../../static/icon/device/connected.png" />
							</view>
							<view class="state">
								<text>设备连接</text>
								<image src="../../static/icon/device/unconnect.png" />
							</view>
							<!-- 操作按钮 -->
							<view class="handle-button-container">
								<view class="device-debug-button" @click="handleLinkEleInfo($event, lift)">设备调试</view>
								<view class="data-release-button">数据下达</view>
							</view>
						</view>
					</view>
				
				</view>
			</view>
		</transition> 
	</view>
</template>

<script>
	import ModalSearch from '../../components/ModalSearch/ModalSearch.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			ModalSearch,
			Empty
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			loadingText: '可通过电梯编码、名称、地址进行搜索',
			channelRange: ['通道1', '通道2', '通道3', '通道4'],
			liftList: []
		}),
		methods: {
			// 搜索电梯
			async handleSearchLift(value) {
				this.loadingText = '搜索中...'
				var res = await request.post('/lift/list_info', {
					limit: 100,
					page: 1,
					lift_name: value
				})
				this.liftList = res.data.map(item => {
					item.channelIndex = 0
					return item
				})
				this.loadingText = '可通过电梯编码、名称、地址进行搜索'
			},
			// 通道选择
			handlechannelPickerChange($event, id) {
				this.liftList = this.liftList.map(item => {
					if(item.elevator_id === id){
						item.channelIndex = $event.detail.value
					}
					return item
				})
			},
			// 跳转到电梯调试页面
			handleLinkEleInfo(e, lift) {
				var item = encodeURIComponent(JSON.stringify(lift))
				uni.navigateTo({
					url: '/pages/eleInfo/eleInfo?item=' + item
				})
			},
			// 关闭弹窗
			handleClose(e) {
				if(e.target.id === 'box') this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
	
	/* 模态框--搜索电梯 */
	.modal-container{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
	}
	
	.modal-card{
		width: 600rpx;
		height: 60vh;
		border-radius: 10rpx;
		background-color: #F9F9F9;
		position: absolute;
		top: 10%;
	}
	
	.header{
		height: 160rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	
	.modal-search{
		width: 100%;
	}
	
	.title{
		font-size: 30rpx;
		color: #000000;
	}
	
	.eva-list{
		height: 60vh;
		padding: 1px 0 30rpx 0;
		box-sizing: border-box;
		overflow-y: scroll;
		background-color: #FFFFFF;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}
	
	.eva-item{
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx 25rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, 0.05);
	}
	.eva-item-active{
		background-color: rgba(65, 144, 245, 0.1);
		border: solid 1px rgba(65, 144, 245, 1);
	}
	
	.eva-name{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #000000;
		margin-bottom: 20rpx;
		font-weight: bold;
	}
	.selected-icon{
		width: 32rpx;
		height: 32rpx;
	}
	.eva-code{
		margin-bottom: 10rpx;
	}
	.eva-code, .eva-address{
		font-size: 23rpx;
		color: #666666;
	}
	.picker-icon{
		width: 20rpx;
		height: 20rpx;
		margin-left: 20rpx;
		transform: rotateZ(90deg);
		transform-origin: center;
	}
	
	.channel-picker, .state{
		font-size: 24rpx;
		color: #000000;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.channel-picker{
		margin-top: 28rpx;
	}
	.state{
		margin-top: 20rpx;
	}
	.state image{
		width: 21rpx;
		height: 22rpx;
	}
	
	.handle-button-container{
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}
	.device-debug-button, .data-release-button{
		border-radius: 6rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.device-debug-button{
		flex: 1;
		background-color: rgba(65, 144, 245, 0.2);
		color: #4190F5;
	}
	.data-release-button{
		flex-shrink: 0;
		width: 172rpx;
		margin-left: 14rpx;
		background-color: #4190F5;
		color: #FFFFFF;
	}
</style>


