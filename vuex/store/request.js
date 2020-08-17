export default {
	state: () => ({
		url: 'http://jiujiu.xdiot.net'
	}),
	
	mutations: {
		setUrl(state, url) {
			state.url = url
		}
	},
	
	getters: {
		baseUrl(state) {
			return state.url
		}
	}
}