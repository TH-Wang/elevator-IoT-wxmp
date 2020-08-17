<template>
	<view class="container" :style="'background-color:' + background">
		<view class="header">
			<text class="title ellipsis">{{record.name}}</text>
			<text class="time">{{record.time}}</text>
		</view>
		<view class="detail ellipsis">
			{{record.detail}}
		</view>
		<view class="footer">
			<text class="address ellipsis">{{record.address}}126号</text>
			<view :class="'type-button ' + 'button-' + record.code">{{getButtonText()}}</view>
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
			getButtonText() {
				switch(this.record.code) {
					case 0: return '待处理';
					case 1: return '进行中';
					case 2: return '已完成';
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
	/* 按钮 */
	.button-0{background-color: #4190F5}
	.button-1{background-color: #FD9026}
	.button-2{background-color: #EEEEEE; color: #999999}
	
	.container{
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 4px;
	}
	
	.header, .footer{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.detail{
		margin: 20rpx 0;
	}
	
	.title{
		width: 78%;
		color: #000000;
		font-size: 28rpx;
	}
	
	.time, .type-button{
		width: 22%;
		color: #999999;
		font-size: 22rpx;
	}
	
	.detail, .address{
		color: #333333;
		font-size: 24rpx;
	}
	
	.address{
		width: 78%;
	}
	
	.type-button{
		width: 20%;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
