<template>
	<view class="container">
		<image v-if="icon" :src="iconImage" class="icon" mode />
		<slot></slot>
		<slot name="suffix"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: Boolean,
				default: true
			},
			iconImage: String
		}
	}
</script>

<style scoped>
	.container{
		width: 600rpx;
		margin: 0 auto;
		padding: 26rpx 0;
		border-bottom: solid 1px #F5F5F5;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
</style>
