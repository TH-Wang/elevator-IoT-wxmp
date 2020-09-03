<template>
	<view class="container" @click="$emit('click')">
		<!-- 头部 -->
		<view class="header">
			<view class="header-tag">到期</view>
			<text class="title ellipsis">{{getPromptType}}</text>
			<text class="time">{{timeText()}}</text>
		</view>
		
		<!-- 证书名称和编码 -->
		<view class="detail ellipsis">
			<text>{{record.title}}</text>
			<text class="space-point">·</text>
			<text>{{record.code}}</text>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<text class="address ellipsis">来源：系统消息</text>
			<view :class="'type-button ' + 'button-' + record.type_time">
				{{getButtonText()}}
			</view>
		</view>
	</view>
</template>

<script>
	import formatDate from '../../utils/formatDate.js'
	
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
		computed: {
			getPromptType() {
				return this.record.type == 1 ? '保险到期提醒' : '证件到期提醒'
			}
		},
		methods: {
			getButtonText() {
				switch(this.record.type_time) {
					case 1: return '待处理';
					case 2: return '到期';
					case 3: return '超期';
					default: return '待处理';
				}
			},
			timeText() {
				var time = this.record.time
				if(typeof time == 'number') {
					return formatDate('YYYY-mm-dd', new Date(time))
				}
				else return time
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
	
	.container{
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 4px;
		background-color: rgba(255, 59, 48, .05);
	}
	
	.header, .footer{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.header-tag{
		margin-right: 10rpx;
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 22rpx;
		color: #FFFFFF;
		border-radius: 6rpx;
		flex-shrink: 0;
		background-color: #FF8D87;
	}
	.time{
		flex-shrink: 0;
	}
	
	.detail{
		margin: 20rpx 0;
		display: flex;
		align-items: center;
	}
	
	.title{
		width: 78%;
		color: #000000;
		font-size: 28rpx;
		flex: 1;
	}
	
	.time, .type-button{
		width: 22%;
		font-size: 22rpx;
	}
	
	.space-point{
		margin: 0 10rpx;
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
	}
	/* 按钮 */
	.button-1{background-color: #4190F5; color: #FFFFFF}
	.button-2{background-color: #FD9026; color: #FFFFFF}
	.button-3{background-color: #EEEEEE; color: #999999}
	
	/* 标签 */
	.tag-repair{background-color: #4190F5;}
	.tag-maint{background-color: #FD9026;}
	.tag-prompt{background-color: #FD9026;}
	.tag-answer{background-color: #4190F5;}
</style>
