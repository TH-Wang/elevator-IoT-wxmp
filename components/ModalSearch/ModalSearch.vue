<template>
	<view class="container">
		<view class="left">
			<image class="icon" src="../../static/icon/search.png" />
			<input
				class="input"
				type="text"
				v-model="value"
				:placeholder="placeholder"
				@confirm="$emit('search', value)"
			/>
		</view>
		<view class="button" @click="$emit('search', value)">搜索</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '输入您想搜索的内容'
			}
		},
		data: () => ({
			value: ''
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
		height: 80rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.left{
		height: 100%;
		padding-left: 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex: 1;
	}
	.icon{
		width: 35rpx;
		height: 35rpx;
		margin-right: 20rpx;
	}
	.input{
		flex: 1;
		height: 100%;
		font-size: 24rpx;
	}
	
	.button{
		width: 120rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		background-color: #4190F5;
	}
</style>

