<template>
	<view class="container">
		
		<!-- 顶部搜索框、按钮 -->
		<view class="header">
			<view class="search-box">
				<ModalSearch />
			</view>
			<view class="scan-button">
				<image class="header-icon" src="../../static/icon/device/monitor.png" />
			</view>
			<view class="bluetooth-button" @click="handleLinkBluetooth">
				<image class="header-icon" src="../../static/icon/device/bluetooth.png" />
			</view>
		</view>
		
		<!-- 选项卡 -->
		<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" />
		
		<swiper
			class="swiper-container"
			:current="active"
			@change="handleSwiperChange"
			:duration="300"
		>
			
			<swiper-item class="swiper-item">
				<view class="data-item" v-for="curt in dataSource.current" :key="curt.id">
					<view class="data-line">
						<text class="label">时间:</text>
						<text>{{curt.time}}</text>
					</view>
					<view class="data-line second-line">
						<text class="label">数据:</text>
						<text>{{curt.buffer}}</text>
					</view>
				</view>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				<view class="data-item device-data-item" v-for="device in dataSource.device" :key="device.id">
					<view class="device-left">
						<view class="data-line">
							<text class="label">时间:</text>
							<text>{{device.time}}</text>
						</view>
						<view class="data-line second-line">
							<text class="label">数据:</text>
							<text>{{device.buffer}}</text>
						</view>
					</view>
					<view class="device-icon">
						<image
							:src="'../../static/icon/feedback/'+(device.code === 0 ? 'error' : 'success')+'.png'"
						/>
						<text class="device-connect" :style="'color:' + device.code === 0 ? '#4190F5' : '#52C28E'">
							{{device.code === 0 ? '连接成功' : '连接失败'}}
						</text>
					</view>
				</view>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				<view class="data-item" v-for="server in dataSource.server" :key="server.id">
					<view class="data-line">
						<text class="label">时间:</text>
						<text>{{server.time}}</text>
					</view>
					<view class="data-line second-line">
						<text class="label">发送:</text>
						<text>{{server.send}}</text>
					</view>
					<view class="data-line receive-line">
						<text class="label">发送:</text>
						<text>{{server.receive}}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import ModalSearch from '../../components/ModalSearch/ModalSearch.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import deviceData from '../../data/device.js'
	
	export default {
		components: {
			ModalSearch,
			Tabs
		},
		props: {
			
		},
		data: () => ({
			active: 0,
			tabs: ['当前数据', '设备连接', '服务器连接'],
			dataSource: deviceData
		}),
		computed: {
			
		},
		methods: {
			handleLinkBluetooth() {
				uni.navigateTo({
					url: '/pages/bluetoothConnect/bluetoothConnect'
				})
			},
			handleTabsSwitch(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color: #F9F9F9;
	}
	.header{
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
	}
	
	.search-box{
		flex: 1;
	}
	
	.scan-button, .bluetooth-button{
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		background-color: rgba(65, 144, 245, 0.2);
	}
	.scan-button{
		margin: 0 30rpx;
	}
	.header-icon{
		width: 100%;
		height: 100%;
	}
	
	.swiper-container{
		height: calc(100vh - 260rpx);
	}
	.swiper-item{
		height: 100%;
		overflow-y: scroll;
		background-color: #FFFFFF;
	}
	
	/* 数据列表 */
	.data-item{
		padding: 30rpx 0;
		margin: 0 30rpx;
		border-bottom: solid 1px #F9F9F9;
		font-size: 24rpx;
		color: #000000;
	}
	.device-data-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.device-icon{
		margin-left: 20rpx;
		flex-shrink: 0;
	}
	.device-icon image{
		width: 24rpx;
		height: 24rpx;
	}
	.device-connect{
		margin-left: 6rpx;
	}
	.label{
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	
	.data-line{
		display: flex;
		align-items: flex-start;
		justify-content: left;
	}
	.second-line{
		margin-top: 20rpx;
	}
	.receive-line{
		margin-top: 60rpx;
	}
</style>

