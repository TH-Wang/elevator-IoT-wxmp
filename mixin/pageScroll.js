export default {
	data: () => ({
		active: 0,
		listScroll: false
	}),
	computed: {
		height() {
			// 页面高度
			return this.$store.getters.commonHeight
		},
		tabbarHeight() {
			return this.$store.getters.tabbarHeight
		},
		mainheight() {
			// 列表高度
			return this.$store.getters.hasSearchHeight
		}
	},
	methods: {
		handleScrollToLower() {
			this.listScroll = true
		},
		handleScrollToUpper() {
			this.listScroll = false
		}
	}
}