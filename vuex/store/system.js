export default {
	state: () => ({
		statusBarHeight: 25
	}),
	
	mutations: {
		setStatusBarHeight(state, value) {
			state.statusBarHeight = value
		}
	},
	
	getters: {
		commonHeight(state) {
			return 'height: calc(100vh - 100rpx - ' + state.statusBarHeight + 'px);'
		},
		tabbarHeight(state) {
			return 'height: calc(100vh - 188rpx - ' + state.statusBarHeight + 'px);'
		},
		hasSearchHeight(state) {
			return 'height: calc(100vh - 200rpx - ' + state.statusBarHeight + 'px);'
		},
		hasLargeSearchHeight(state) {
			return 'height: calc(100vh - 230rpx - ' + state.statusBarHeight + 'px);'
		}
	}
}