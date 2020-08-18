import md5 from 'md5'

const request = {
	// 登录
	login: (data) => {
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
						url: 'https://xdkj.xdiot.net/wx/get_url',
						method: 'POST',
						data: reqData,
						success: res => {
							console.log(res)
							if(res.data.code === 1){
								var token = res.data.data.token
								// 存储token
								uni.setStorageSync('token', token)
								resolve(res.data)
							}
							else {
								reject(res.data.msg)
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
			// 取出token
			var token = uni.getStorageSync('token')
			// 发送请求
			uni.request({
				url,
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
	post: (url, data) => {
		return new Promise((resolve, reject) => {
			// 取出token
			var token = uni.getStorageSync('token')
			var queryUrl = url
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