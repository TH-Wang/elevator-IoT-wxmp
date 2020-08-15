<template>
	<view>
		<view
			class="status-bar"
			:style="'height:' + height + 'px'"
		></view>
		<view class="header">
			<view
				class="icon-button"
				v-if="hasBack"
				@click="handleLinkBack()"
			>
				<image class="icon" src="../../static/icon/back.png" />
			</view>
			<view class="title">{{title}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		props: {
			title: String,
			hasBack: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			height() {
				return this.$store.state.system.statusBarHeight
			}
		},
		methods: {
			handleLinkBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.status-bar {
		width: 100%;
	}
	
	.header{
		height: 88rpx;
		border-bottom: solid 1px #F9F9F9;
		box-sizing: border-box;
		position: relative;
	}
	
	.icon-button{
		display: inline-block;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 20rpx 0 30rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
	.icon{
		width: 20rpx;
		height: 36rpx;
	}
	
	.title{
		text-align: center;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 36rpx;
		color: #333333;
		font-family: 'PingFang SC';
		font-weight: bold;
	}
</style>
