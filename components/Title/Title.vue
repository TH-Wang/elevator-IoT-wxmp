<template>
	<view class="container">
		<view class="main">
			<view class="line"></view>
			<text class="title">{{title}}</text>
		</view>
		<slot name="suffix"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '标题'
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 690rpx;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.main{
		display: flex;
		align-items: center;
	}
	.line{
		width: 3px;
		height: 21rpx;
		margin-right: 10rpx;
		border-radius: 3px;
		background-color: #4190F5;
	}
	
	.title{
		font-size: 30rpx;
		color: #000000;
	}
</style>
