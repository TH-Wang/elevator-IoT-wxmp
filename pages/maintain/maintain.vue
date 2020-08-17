<template>
	<TabbarPage :header="{title: '保养', hasBack: false}" :tabbar="{active: 1}">
		<view :style="height">
			<view class="main">
				正在努力开发中...
			</view>
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

<style scoped>
	@import url("../../static/css/page.css");
	
	.main{
		padding-top: 100px;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		color: #666666;
	}
</style>
