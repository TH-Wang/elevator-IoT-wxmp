<template>
	<view class="container">
		<!-- 标题导航栏 -->
		<NavHeader title="" />
		
		<!-- 页面主体 -->
		<scroll-view :scroll-y="true" class="main" :style="height">
			
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	
	export default {
		components: {
			NavHeader
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		}
	}
</script>

<style scoped>
</style>
