import md5 from 'md5'
import store from '../vuex/index.js'

const app = getApp()

const request = {
	login: () => {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					var { code } = res
					console.log('code:'+code)
					uni.request({
						url: 'https://xdkj.xdiot.net/wx/get_url/login',
						method: 'POST',
						data: {code},
						success: res => {
							console.log(res)
							if(res.data.code == 1){
								var token = res.data.data.token
								// 存储token
								uni.setStorageSync('token', token)
								resolve(res.data.data)
							}
							else {
								reject(res.data.content || res.data.msg)
							}
						},
						fail: (err) => {
							reject(err)
						}
					});
				}
			})
		})
	},
	// 绑定
	bind: (data) => {
		return new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					var code = res.code
					console.log('code:'+code)
					var password = md5(data.password)
					var reqData = {
						channel_number: data.channel_number,
						name: data.name,
						password,
						code
					}
					uni.request({
						url: 'https://xdkj.xdiot.net/wx/get_url/bind',
						method: 'POST',
						data: reqData,
						success: res => {
							console.log(res)
							if(res.data.code == 1){
								var token = res.data.data.token
								// 存储token
								uni.setStorageSync('token', token)
								resolve(res.data.data)
							}
							else {
								reject(res.data.content || res.data.msg)
							}
						},
						fail: (err) => {
							reject(err)
						}
					});
				}
			})
		})
	},
	
	// POST
	post: (url, data) => {
		return new Promise((resolve, reject) => {
			var reqUrl = store.state.request.url + '/api' + url
			// 取出token
			var token = uni.getStorageSync('token')
			// 发送请求
			uni.request({
				url: reqUrl,
				method: 'POST',
				header: {
					"token": token
				},
				data: data,
				success: res => {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	
	// GET
	get: (url, data) => {
		return new Promise((resolve, reject) => {
			var baseUrl = store.state.request.url + '/api'
			// 取出token
			var token = uni.getStorageSync('token')
			var queryUrl = baseUrl + url
			if(data) {
				queryUrl = url + '?'
				Object.entries(data).forEach(([key, value]) => {
					queryUrl += `${key}=${value}&`
				})
				queryUrl.slice(0, -1)
			}
			// 发送请求
			uni.request({
				url: queryUrl,
				method: 'GET',
				header: {
					"token": token
				},
				success: res => {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
}

export default request