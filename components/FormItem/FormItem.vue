<template>
	<view class="container">
		<view class="main">
			<text class="label">{{label}}</text>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: '请输入'
			}
		},
		data: () => ({
			
		}),
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
	}
	.main{
		width: 690rpx;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #F9F9F9;
	}
	.label{
		font-size: 24rpx;
		color: #2E2E2E;
		margin-right: 20rpx;
	}
</style>

