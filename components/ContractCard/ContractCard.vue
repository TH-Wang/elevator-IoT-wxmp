<template>
	<view class="card" @click="$emit('click')">
		<view class="header">
			<view class="title ellipsis">{{record.name}}</view>
			<view :class="'type-button ' + 'button-' + record.type">{{getButtonText()}}</view>
		</view>
		
		<view class="detail ellipsis-twolines">
			{{record.syn}}
		</view>
		
		<view class="time-range">
			{{record.start_time + '-' + record.end_time}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			record: {
				type: Object,
				default: ()=>({})
			},
			background: {
				type: String,
				default: 'rgba(65, 144, 245, .05)'
			}
		},
		methods: {
			getButtonStyle() {
				switch(this.record.type) {
					case 0: return 'background-color: #4190F5; color: #FFFFFF';
					case 1: return 'background-color: #FD9026; color: #FFFFFF';
					case 2: return 'background-color: #EEEEEE; color: #999999';
					default: return 'background-color: #EEEEEE; color: #999999';
				}
			},
			getButtonText() {
				switch(this.record.type) {
					case 1: return '待收款';
					case 2: return '执行中';
					case 3: return '已完成';
					default: return '已完成';
				}
			}
		}
	}
</script>

<style scoped>
	/* 省略号 */
	.ellipsis{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	.ellipsis-twolines{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	/* 按钮 */
	.button-1{background-color: #4190F5; color: #FFFFFF}
	.button-2{background-color: #FD9026; color: #FFFFFF}
	.button-3{background-color: rgba(65, 144, 245, 0.1); color: #4190F5}
	.button-4{background-color: #EEEEEE; color: #999999}
	
	.card{
		width: 690rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}
	
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title{
		font-size: 28rpx;
		color: #000000;
	}
	
	.type-button{
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
		font-size: 22rpx;
	}
	
	.detail{
		margin: 20rpx 0;
		font-size: 24rpx;
		color: #666666;
	}
	.time-range{
		font-size: 22rpx;
		color: #666666;
	}
</style>
