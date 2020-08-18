export default {
	state: () => ({
		url: 'http://jiujiu.xdiot.net'
	}),
	
	mutations: {
		setBaseUrl(state, url) {
			state.url = url
		}
	},
	
	getters: {
		baseUrl(state) {
			return state.url
		}
	}
}