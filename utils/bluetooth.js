// 寻找外围蓝牙设备
function openBluetoothAdapter() {
	return new Promise((resolve, reject) => {
		// 初始化蓝牙模块
		uni.openBluetoothAdapter({
			success(res) {
				console.log('-----蓝牙模块初始化成功-----')
				console.log(res)
				resolve()
			},
			fail(err) {
				console.log('# 初始化失败')
				console.log(err)
				uni.showModal({
					title: '扫描失败',
					content: '请打开蓝牙功能，然后点击上方立即扫描按钮'
				})
			}
		})
	})
}

function startScanBluetooth() {
	return new Promise((resolve, reject) => {
		// 开始扫描蓝牙设备
		uni.startBluetoothDevicesDiscovery({
			success(res) {
				console.log('-----扫描成功-----')
				console.log(res)
				// 返回成功
				resolve()
			},
			fail(err) {
				console.log('# 扫描失败')
				console.log(err)
			}
		})
	})
}

function initBluetooth() {
	return new Promise((resolve, reject) => {
		// 获取蓝牙模块状态
		uni.getBluetoothAdapterState({
			success(res) {
				console.log('-----蓝牙已打开-----')
				console.log(res)
				resolve()
			},
			fail: async function(err) {
				console.log('# 蓝牙不可用状态')
				console.log(err)
				// 如果还未初始化蓝牙模块
				if(err.errCode === 10000) {
					await openBluetoothAdapter()
					resolve()
				}
				// 如果蓝牙适配器不可用
				else if(err.errCode === 10001) {
					uni.showModal({
						title: '扫描失败',
						content: '请打开蓝牙和定位服务，然后点击上方立即扫描按钮'
					})
				}
			}
		})
	})
}

export {
	initBluetooth,
	startScanBluetooth
}