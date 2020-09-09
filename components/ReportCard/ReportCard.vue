<template>
	<view
		class="list-item"
	>
		<view class="header">
			<view class="title ellipsis">{{record.name}}</view>
			<view class="time">{{record.fault_start_time}}</view>
		</view>
		
		<view class="detail ellipsis">{{record.fault_syn}}</view>
		
		<view class="info">
			<view class="info-item">
				安全等级: {{safeLevel}}
			</view>
			<view class="info-item">
				是否困人: {{isTiring}}
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		props: {
			record: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			safeLevel() {
				return this.record.security_level ? `${this.record.security_level}级` : ''
			},
			isTiring() {
				return this.record.is_tiring == 0 ? '否' : '是'
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	
	.list-item{
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx 30rpx 38rpx 30rpx;
		width: 690rpx;
		height: 220rpx;
		margin-bottom: 30rpx;
		box-sizing: border-box;
		background-color: #F9F9F9;
		border-radius: 3px;
	}
	
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title{
		flex: 1;
		font-size: 28rpx;
		color: #000000;
	}
	.time{
		font-size: 22rpx;
		color: #999999;
	}
	
	.detail{
		margin: 20rpx 0 30rpx 0;
		font-size: 24rpx;
		color: #333333;
	}
	
	.info{
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #333333;
	}
	.info-item{
		flex: 1;
	}
</style>

