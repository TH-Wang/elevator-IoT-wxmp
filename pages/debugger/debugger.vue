<template>
	<view class="container">
		
		<!-- 顶部标题-->
		<view class="header">
			<image class="logo" src="../../static/image/debugger-logo.png" />
			<text class="title">电梯设备调试器</text>
		</view>
		
		<!-- 主体 -->
		<view class="main">
			
			<!-- 接收消息框 -->
			<view class="receive-container">
				<view
					class="receive-item"
					v-for="item in resData"
					:key="item.time"
				>
					{{item.value}}
				</view>
			</view>
			
			<!-- 按钮组 -->
			<view class="button-container">
				<view
					v-for="(item, index) in buttonConfig"
					:key="index"
					:class="'button' + ' button-' + item.size + ' button-' + item.color"
					@click="writeBLECharacteristicValue($event, item.sendMsg)"
				>
					<text v-if="item.content">{{item.content}}</text>
					<image v-else :src="item.image" />
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import buttonConfig from './buttonConfig.js'
	
	export default {
		data: () => ({
			// 按钮配置
			buttonConfig: buttonConfig,
			// 已连接设备id
			deviceId: null,
			// 服务id
			serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
			// 特征值id
			characteristicId: null,
			// 监听的uuid
			notifyId: null,
			// 接收到的数据列表
			resData: []
		}),
		methods: {
			// 1.获取连接蓝牙设备所有的服务
			getBLEDeviceServices: function() {
				var _this_ = this
				uni.getBLEDeviceServices({
					deviceId: _this_.deviceId,
					success(res) {
						console.log('-----成功获取蓝牙服务-----')
						console.log(res)
						_this_.getBLEDeviceCharacteristics()
					},
					fail(err) {
						console.log('# 获取服务失败')
					}
				})
			},
			// 2.获取特征值
			getBLEDeviceCharacteristics: function() {
				var _this_ = this
				uni.getBLEDeviceCharacteristics({
					deviceId: _this_.deviceId,
					serviceId: _this_.serviceId,
					success(res) {
						console.log('-----成功服务特征值-----')
						console.log(res.characteristics)
						res.characteristics.forEach(item => {
							if(item.properties.write){
								console.log('**********可写特征值')
								console.log(item)
								_this_.characteristicId = item.uuid
							}
							if(item.properties.notify){
								console.log('**********可读特征')
								console.log(item)
								_this_.notifyId = item.uuid
							}
						})
						
					}
				})
			},
			// 3.订阅蓝牙设备的特征值变化
			notifyBLECharacteristicValueChange: function() {
				var _this_ = this
				uni.notifyBLECharacteristicValueChange({
					state: true,
					deviceId: _this_.deviceId,
					serviceId: _this_.serviceId,
					characteristicId: _this_.notifyId,
					success(res) {
						console.log('-----notify启用成功-----')
						console.log(res)
						_this_.onBLECharacteristicValueChange()
					},
					fail(err) {
						console.log('# 订阅失败')
						console.log(err)
					}
				})
			},
			// 4.监听蓝牙发送的数据
			onBLECharacteristicValueChange: function() {
				var _this_ = this
				uni.onBLECharacteristicValueChange(function(res){
					console.log('-----接收数据-----')
					console.log(_this_.bufferToString(res.value))
					_this_.resData.push({
						time: Date.now(),
						value: _this_.bufferToString(res.value)
					})
				})
			},
			// 5.发送数据到蓝牙设备
			writeBLECharacteristicValue: function(e, value) {
				console.log('尝试发送消息：' + value)
				var _this_ = this
				uni.writeBLECharacteristicValue({
					deviceId: _this_.deviceId,
					serviceId: _this_.serviceId,
					characteristicId: _this_.characteristicId,
					value: _this_.strToBuffer(value),
					success(res) {
						console.log('-----写入数据成功-----')
						console.log(value)
						console.log(res)
					},
					fail(err) {
						console.log('# 写入数据失败')
						console.log(err)
					}
				})
			},
			
			// String 转 ArrayBuffer
			strToBuffer(str) {
				var buffer = new ArrayBuffer(str.length)
				var dataView = new DataView(buffer)
				for (var i = 0; i < str.length; i++) {
					dataView.setUint8(i, str.charAt(i).charCodeAt())
				}
				console.log(buffer)
				return buffer
			},
			// ArrayBuffer 转 String
			bufferToString(buffer) {
				return String.fromCharCode.apply(null, new Uint8Array(buffer));
			}
		},
		onLoad(option) {
			var { deviceId } = option
			this.deviceId = deviceId
		}
	}
</script>

<style scoped>
	.container{
		padding: 20rpx 75rpx 50rpx 75rpx;
		box-sizing: border-box;
		height: 100vh;
		background-color: #000000;
	}
	
	.header{
		margin-bottom: 50rpx;
		display: flex;
		align-items: center;
	}
	.logo{
		width: 105rpx;
		height: 105rpx;
	}
	.title{
		font-size: 50rpx;
		color: #FFFFFF;
		margin-left: 27rpx;
	}
	
	.main{
		height: calc(100% - 155rpx);
	}
	
	.receive-container{
		width: 100%;
		height: calc(100% - 454rpx);
		margin-bottom: 90rpx;
		background-color: #FFFFFF;
		padding: 50rpx;
		box-sizing: border-box;
		overflow-y: scroll;
	}
	.receive-item{
		font-size: 50rpx;
		color: #494949;
		margin-bottom: 30rpx;
	}
	
	.button-container{
		height: 364rpx;
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
	}
	.button{
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.button-default{
		width: 180rpx;
	}
	.button-large{
		width: 286rpx;
	}
	.button image{
		width: 47rpx;
		height: 47rpx;
	}
	
	.button-blue{
		background-color: rgba(61, 168, 218, 1);
	}
	.button-blue:active{
		background-color: rgba(61, 168, 218, 0.8);
	}
	
	.button-white{
		background-color: #FFFFFF;
	}
	.button-white:active{
		background-color: #EEEEEE;
	}
	
	.button-green{
		background-color: rgba(34, 153, 62, 1);
	}
	.button-green:active{
		background-color: rgba(34, 153, 62, 0.8);
	}
	
</style>

