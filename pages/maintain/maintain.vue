<template>
	<TabbarPage :header="{title: '保养', hasBack: false}" :tabbar="{active: 1}">
		<view :style="height">
			保养
		</view>
	</TabbarPage>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	
	export default {
		components: {
			TabbarPage
		},
		computed: {
			height() {
				return this.$store.getters.tabbarHeight
			}
		}
	}
</script>

<style>
	@import url("../../static/css/page.css");
</style>
