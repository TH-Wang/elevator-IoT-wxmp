<template>
	<view class="container">
		<view class="avatar">
			<image class="avatar-image" src="../../static/image/avatar.png" mode="aspectFill" />
		</view>
		<view class="realname" @click="handleLinkEditInfo">
			<text>山川皆无恙</text>
			<image v-if="allowEidt" class="edit-icon" src="../../static/icon/mine/edit.png" />
		</view>
		<view class="detail">
			<text>维保员</text>
			<text class="line"></text>
			<text>男</text>
			<text class="line"></text>
			<text>12345678954</text>
		</view>
		<view class="email">
			15568985474@163.com   ·   维修部
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			allowEidt: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleLinkEditInfo() {
				uni.navigateTo({
					url: '/pages/editInfo/editInfo'
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 457rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, 0.05);
	}
	
	.avatar{
		width: 178rpx;
		height: 178rpx;
		margin: 0 auto;
		margin-bottom: 50rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatar-image{
		width: 100%;
		height: 100%;
	}
	
	.realname{
		margin-bottom: 20rpx;
		color: #000000;
		font-size: 31rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.edit-icon{
		width: 30rpx;
		height: 30rpx;
		margin-left: 32rpx;
	}
	
	.detail{
		margin-bottom: 10rpx;
		text-align: center;
		color: #000000;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.line{
		margin: 0 10px;
		width: 0.6px;
		height: 20rpx;
		background-color: #000000;
		display: inline-block;
	}
	
	.email{
		text-align: center;
		color: #000000;
		font-size: 23rpx;
	}
</style>
