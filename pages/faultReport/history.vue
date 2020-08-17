<template>
	<scroll-view
		:scroll-y="true"
		class="container"
		:style="height"
	>
		<view class="list-container">
			
			<view
				class="list-item"
				v-for="item in dataSource"
				:key="item.id"
			>
				<view class="header">
					<view class="title ellipsis">{{item.prop}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				
				<view class="detail ellipsis">{{item.detail}}</view>
				
				<view class="info">
					<view class="info-item">
						安全等级: {{item.safe}}
					</view>
					<view class="info-item">
						是否困人: {{item.trapped}}
					</view>
				</view>
			</view>
			
		</view>
	</scroll-view>
</template>

<script>
	import faultData from '../../data/fault.js'
	
	export default {
		data: () => ({
			dataSource: faultData
		}),
		computed: {
			height() {
				return this.$store.getters.hasSearchHeight
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	
	.container{
		background-color: #F9F9F9;
	}
	.list-container{
		margin-top: 20rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
	}
	
	.list-item{
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
