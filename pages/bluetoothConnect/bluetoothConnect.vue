<template>
	<view class="container">
		<!-- 顶部扫描结果 -->
		<view class="header">
			<view class="scan-box">
				<image class="scan-icon" src="../../static/icon/device/scan.png" />
				<view class="scan-text">
					扫描到<text class="device-connect-count">{{deviceList.length}}台</text>设备
				</view>
				<view class="scan-button" @click="bluetooth">重新扫描</view>
			</view>
		</view>
		
		<!-- 蓝牙列表 -->
		<view class="bt-list">
			<view class="search-loading">
				<text>搜索到的设备</text>
				<image v-show="searching" src="../../static/icon/feedback/loading.png" />
			</view>
			
			<!-- 搜索到蓝牙设备 -->
			<view class="bt-item" v-for="device in deviceList" :key="device.deviceId">
				<image src="../../static/icon/device/bluetooth-opacity.png" />
				<view class="bt-info">
					<text class="bt-name">{{device.name == '' ? '未知设备' : device.name}}</text>
					<text class="bt-mac">{{device.deviceId}}</text>
				</view>
				<!-- 待链接设备 -->
				<view
					v-if="deviceConnectId !== device.deviceId"
					class="bt-bind-button"
					@click="connectBluetooth(device.deviceId)"
					:style="'background-color:' + (connectingId == device.deviceId ? 'rgba(65, 144, 245, 0.4)' : '')"
				>
					{{connectingId == device.deviceId ? '连接中...' : '连接'}}
				</view>
				<!-- 已连接设备 -->
				<view v-if="deviceConnectId == device.deviceId" class="bt-close-button">断开</view>
				<view
					v-if="deviceConnectId == device.deviceId"
					class="bt-bind-button"
					@click="modalVisible=true"
				>绑定</view>
			</view>
		</view>
		
		
		<ModalSearchBind :visible="modalVisible" @close="modalVisible=false" />
	</view>
</template>

<script>
	import {
		initBluetooth,
		startScanBluetooth
	} from '../../utils/bluetooth.js'
	import Empty from '../../components/Empty/Empty.vue'
	import ModalSearchBind from './modalSearchBind.vue'
	
	export default {
		components: {
			Empty,
			ModalSearchBind
		},
		props: {
			
		},
		data: () => ({
			value: '',
			deviceList: [],
			// 正在扫描
			searching: false,
			// 正在连接的设备
			connectingId: null,
			// 连接设备id
			deviceConnectId: null,
			// 服务id
			serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB",
			// 特征值id
			characteristicId: null,
			// 监听的uuid
			notifyId: null,
			resData: null,
			modalVisible: false,
		}),
		computed: {
			
		},
		methods: {
			// 1.初始化蓝牙模块
			async bluetooth() {
				var _this_ = this
				await initBluetooth()
				await startScanBluetooth()
				this.searching = true
				console.log('-----开始搜索蓝牙-----')
				uni.onBluetoothDeviceFound(function(res){
					var device = res.devices[0]
					var notexist = _this_.deviceList.findIndex(i=>i.deviceId===device.deviceId) === -1
					if(notexist) _this_.deviceList.push(device)
				})
				setTimeout(() => {
					if(_this_.deviceList.length === 0){
						uni.showModal({
							title: '提示',
							content: '请检查是否蓝牙和定位服务是否打开!'
						})
					}
				}, 5000)
			},
			// 2.连接设备
			connectBluetooth(deviceId) {
				var _this_ = this
				this.connectingId = deviceId
				uni.createBLEConnection({
					deviceId,
					success(res) {
						console.log(`${deviceId}设备连接成功`)
						console.log(res)
						_this_.deviceId = deviceId
						_this_.getBLEDeviceServices()
						_this_.connectingId = null
						// 停止搜索
						uni.startBluetoothDevicesDiscovery({
							success(res) {
								console.log('-----停止搜索附近蓝牙设备-----')
								console.log(res)
								_this_.searching = false
							}
						})
					},
					fail(err) {
						console.log('# 蓝牙设备连接失败')
						console.log(err)
						_this_.connectingId = null
						_this_.searching = false
						uni.showModal({
							showCancel: false,
							title: '连接失败',
							content: `蓝牙设备${_this_.deviceList.find(i=>i.deviceId===deviceId).name}连接失败，请稍后重试`
						})
					}
				})
			},
			// 3.获取连接蓝牙设备所有的服务
			getBLEDeviceServices() {
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
			// 4.获取特征值
			getBLEDeviceCharacteristics() {
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
						// 5.订阅蓝牙设备的特征值变化
						uni.notifyBLECharacteristicValueChange({
							state: true,
							deviceId: _this_.deviceId,
							serviceId: _this_.serviceId,
							characteristicId: _this_.notifyId,
							success(res) {
								console.log('-----notify启用成功-----')
								console.log(res)
								// 6.监听蓝牙发送的数据
								uni.onBLECharacteristicValueChange(function(res){
									console.log('-----接收数据-----')
									console.log(_this_.ab2hex(res.value))
									_this_.resData = _this_.ab2hex(res.value)
								})
							},
							fail(err) {
								console.log('# 订阅失败')
								console.log(err)
							}
						})
					}
				})
			},
			// 7.发送数据到蓝牙设备
			writeBLECharacteristicValue() {
				var _this_ = this
				var buffer = new ArrayBuffer(1)
				var dataView = new DataView(buffer)
				dataView.setUint8(0, )
				console.log('-----二进制数据-----')
				console.log(buffer)
				uni.writeBLECharacteristicValue({
					deviceId: _this_.deviceId,
					serviceId: _this_.serviceId,
					characteristicId: _this_.characteristicId,
					value: _this_.toHEX(_this_.value),
					success(res) {
						console.log('-----写入数据成功-----')
						console.log(_this_.toHEX(_this_.value))
						console.log(res)
					},
					fail(err) {
						console.log('# 写入数据失败')
						console.log(err)
					}
				})
			},
			// 监听characteristic变化
			
			// 转16进制
			toHEX(value) {
				var typedArray = new Uint8Array(value.match(/[\da-f]{2}/gi).map(function (h) {
				  return parseInt(h, 16)
				}))
				console.log("hextobyte ", typedArray)
				return typedArray.buffer
			},
			ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')
			}
		},
		onLoad() {
			this.bluetooth()
		}
	}
</script>

<style scoped>
	@keyframes loading{
		from{transform: rotateZ(0deg);}
		to{transform: rotateZ(360deg);}
	}
	
	.container{
		background-color: #F9F9F9;
	}
	
	.header{
		padding: 30rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.scan-box{
		padding: 30rpx 20rpx 30rpx 30rpx;
		border-radius: 10rpx;
		background-color: #F9F9F9;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.scan-icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 4rpx;
	}
	.device-connect-count{
		color: #4190F5;
		margin: 0 10rpx;
	}
	.scan-text{
		margin: 0 10rpx;
		flex: 1;
		font-size: 24rpx;
		color: #999999;
	}
	.scan-button{
		flex-shrink: 0;
		margin-left: 20rpx;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #52C28E;
		color: #FFFFFF;
		font-size: 24rpx;
		border-radius: 6rpx;
	}
	
	.search-loading{
		height: 60rpx;
		margin: 0 30rpx;
		box-sizing: border-box;
		border-bottom: solid 1px #F9F9F9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20rpx;
		color: #666666;
	}
	.search-loading image{
		width: 26rpx;
		animation: loading 1000ms forwards infinite linear;
		height: 26rpx;
	}
	
	.bt-list{
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}
	.bt-item{
		margin: 0 30rpx;
		padding: 30rpx 0;
		box-sizing: border-box;
		border-bottom: solid 1px #F9F9F9;
		display: flex;
		align-items: center;
	}
	.bt-item image{
		width: 68rpx;
		height: 68rpx;
		border-radius: 14rpx;
	}
	.bt-info{
		flex: 1;
		display: flex;
		flex-direction: column;
		margin: 0 20rpx 0 30rpx;
	}
	.bt-name{
		font-size: 24rpx;
		color: #000000;
	}
	.bt-mac{
		font-size: 22rpx;
		color: #999999;
		margin-top: 10rpx;
	}
	
	.bt-bind-button, .bt-close-button{
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		border-radius: 6rpx;
		font-size: 22rpx;
	}
	.bt-bind-button{
		background-color: #4190F5;
		color: #FFFFFF;
	}
	.bt-close-button{
		margin-right: 20rpx;
		background-color: rgba(65, 144, 245, 0.2);
		color: #4190F5;
	}
</style>

