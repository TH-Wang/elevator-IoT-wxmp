<template>
	<view class="container">
			
			<!-- 上方卡片 -->
			<view class="header">
				<!-- logo -->
				<view class="logo-card">
					<image src="../../static/image/logo.png" />
				</view>
				
				<!-- 版本信息 -->
				<view class="app-name">梯联宝</view>
				<view class="app-version">
					<text style="margin-right: 6rpx">Version</text>
					<text>1.14.0</text>
				</view>
				
				<!-- 版本 -->
				<view class="lastest-version">
					<text>最新版本</text>
					<text style="color: #999999">v 2.6.1</text>
				</view>
			</view>
			
			<CommonButton text="下载最新版" />
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	
	export default {
		components: {
			NavHeader,
			CommonButton
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: #F9F9F9;
	}
	
	.header{
		width: 100%;
		height: 576rpx;
		padding-top: 94rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	
	.logo-card{
		width: 136rpx;
		height: 136rpx;
		margin: 0 auto;
		margin-bottom: 54rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 1px 2px 21px -2px rgba(0,136,255,0.2);
	}
	.logo-card image{
		width: 110rpx;
		height: 96rpx;
	}
	.app-name{
		font-size: 46rpx;
		color: #000000;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 8rpx;
	}
	.app-version{
		color: #000000;
		font-size: 32rpx;
		text-align: center;
		margin: 0 auto;
	}
	.lastest-version{
		height: 112rpx;
		margin: 0 30rpx;
		margin-top: 63rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #000000;
		border-top: solid 1px #F9F9F9;
	}
</style>
