export default {
	state: () => ({
		info: {}
	}),
	
	mutations: {
		setUserInfo(state, data) {
			state.info = data
		}
	}
}