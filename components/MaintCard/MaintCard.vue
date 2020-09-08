<template>
	<view class="main-list-li">
		<view class="main-list-li-ttle">
			<view class="main-list-li-ttle-name">{{ dataSource.ele_name }}</view>
			<view class="main-list-li-ttle-time">{{ dataSource.maint_time }}</view>
		</view>
		<view class="main-list-li-num">
			电梯编号: {{ dataSource.elevator_number }} <text v-if="dataSource.register_code">【{{ dataSource.register_code }}】</text>
		</view>
		<view class="main-list-li-fot">
			<view class="main-list-li-fot-addres">
				{{ dataSource.address }}
			</view>
			<view class="main-list-li-fot-btn">
				<text class="main-list-li-fot-btn-d" v-if="dataSource.is_maintain==1">待处理</text>
				<text class="main-list-li-fot-btn-z" v-if="dataSource.is_maintain==3">进行中</text>
				<text class="main-list-li-fot-btn-w" v-if="dataSource.is_maintain==2">已完成</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
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
	.main-list-li {
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFF9F4;
		border-radius: 8rpx;
		margin-top: 30rpx;
	}
	
	.main-list-li-ttle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.main-list-li-ttle-name {
		flex: 1;
		font-size: 28rpx;
		font-weight: bolder;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.main-list-li-ttle-time {
		font-size: 24rpx;
		color: #999;
		margin-left: 40rpx;
	}
	
	.main-list-li-num {
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.main-list-li-fot {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.main-list-li-fot-addres {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.main-list-li-fot-btn {
		margin-left: 40rpx;
	}
	
	.main-list-li-fot-btn text {
		font-size: 22rpx;
		padding: 6rpx 18rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
	}
	
	.main-list-li-fot-btn-d {
		background-color: #4190F5;
		color: #fff;
	}
	
	.main-list-li-fot-btn-z {
		background-color: #4190F5;
		color: #FD9026;
	}
	
	.main-list-li-fot-btn-w {
		background-color: #eeeeee;
		color: #999;
	}
</style>

