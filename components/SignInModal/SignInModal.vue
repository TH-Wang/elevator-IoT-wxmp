<template>
	<view class="container">
		<transition name="show">
			<view v-if="visible" class="background" id="back" @click="handleClose">
				<view class="modal-card">
					<!-- 背景 -->
					<image class="background-image" src="../../static/image/signin/background.png" />
					<image class="calendar" src="../../static/image/signin/calendar.png" />
					<image id="close" class="close-icon" src="../../static/image/signin/close.png" />
					<view class="content">
						<view class="title">签到成功</view>
						<view class="tip">请进行急修任务</view>
					</view>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClose(e) {
				if(e.target.id == 'back' || e.target.id == 'close'){
					this.$emit('close')
				}
			}
		}
	}
</script>

<style scoped>
	.show-enter-active, .show-leave-active {
	  transition: opacity .5s;
	}
	.show-enter, .fade-leave-to {
	  opacity: 0;
	}
	
	.background{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.modal-card{
		width: 453rpx;
		height: 415rpx;
		position: relative;
	}
	
	.background-image{
		width: 100%;
		height: 100%;
	}
	.calendar{
		width: 163rpx;
		height: 149rpx;
		position: absolute;
		top: 85rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.close-icon{
		width: 58rpx;
		height: 58rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}
	
	.content{
		position: absolute;
		bottom: 64rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}
	.title{
		color: #4190F5;
		font-size: 30rpx;
		margin-bottom: 8rpx;
	}
	.tip{
		color: #999999;
		font-size: 24rpx;
	}
</style>

