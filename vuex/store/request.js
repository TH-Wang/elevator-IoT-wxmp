export default {
	state: () => ({
		url: ''
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