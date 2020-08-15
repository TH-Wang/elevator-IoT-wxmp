<template>
	<view class="button">
		{{text}}
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '常用按钮'
			}
		}
	}
</script>

<style scoped>
	.button{
		margin: 80rpx auto 30rpx auto;
		width: 530rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 5px;
		text-align: center;
		background-color: #4190F5;
		font-size: 32rpx;
		color: #FFFFFF;
	}
</style>
