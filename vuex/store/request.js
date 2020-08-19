export default {
	state: () => ({
		url: ''
	}),
	
	mutations: {
		setBaseUrl(state, url) {
			console.log(url)
			state.url = url
		}
	},
	
	getters: {
		baseUrl(state) {
			return state.url
		}
	}
}