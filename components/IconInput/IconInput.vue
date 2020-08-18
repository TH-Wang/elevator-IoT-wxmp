<template>
	<view class="container">
		<view :class="'content ' + (tip !== '' ? 'err' : '')">
			<image v-if="icon" :src="iconImage" class="icon" mode />
			<slot></slot>
			<icon v-if="showSuccess" v-show="success" type="success" size="16" class="success" />
			<slot name="suffix"></slot>
		</view>
		<view
			v-show="tip !== ''"
			class="err-tip"
		>
			{{tip}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: Boolean,
				default: true
			},
			iconImage: String,
			tip: {
				type: String,
				default: ''
			},
			showSuccess: {
				type: Boolean,
				default: false
			},
			success: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.container{
		margin-bottom: 10rpx;
	}
	.content{
		width: 600rpx;
		margin: 0 auto;
		margin-bottom: 5px;
		padding: 26rpx 0;
		border-bottom: solid 1px #F5F5F5;
		display: flex;
		align-items: center;
	}
	.err{
		border-bottom: solid 0.5px #FF0000;
	}
	.icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.err-tip{
		width: 600rpx;
		height: 20rpx;
		margin: 0 auto;
		font-size: 20rpx;
		color: #FF0000;
	}
</style>
