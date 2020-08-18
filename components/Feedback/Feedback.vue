<template>
	<view class="">
		<transition name="show">
			<view v-if="visible" class="container" id="back" @click="handleClose">
				
				<!-- 卡片 -->
				<view class="card" id="card">
					
					<!-- 标题 -->
					<view class="title">{{title}}</view>
					
					<!-- 反馈图标 -->
					<image class="icon loading" v-if="mode === 'loading'" src="../../static/icon/feedback/loading.png" />
					<image class="icon" v-else-if="mode === 'success'" src="../../static/icon/feedback/success.png" />
					<image class="icon" v-else-if="mode === 'error'" src="../../static/icon/feedback/error.png" />
					<image class="icon" v-else-if="mode === 'custom'" :src="iconPath" />
					
					<!-- 提示信息 -->
					<view v-if="mode === 'custom'" class="tip" :style="'color:'+tipColor">{{tip}}</view>
					<view v-else :class="'tip ' + 'tip-color-' + mode">{{tip}}</view>
					
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否弹出
			visible: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '标题'
			},
			// 图标显示状态：loading-加载、success-成功、error-失败、custom-自定义
			mode: {
				type: String,
				default: 'success'
			},
			// 自定义图标，仅 mode=custom 时才效
			iconPath: String,
			tip: {
				type: String,
				default: '这里是额外的提示信息'
			},
			// 自定义tip文字颜色，仅 mode=custom 时生效
			tipColor: {
				type: String,
				default: '#555555'
			}
		},
		data: () => ({
			
		}),
		computed: {
			
		},
		methods: {
			handleClose(e) {
				if(e.target.id === 'back') this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	/* 过渡动画 */
	
	@keyframes fade-in{
		from{opacity: 0;}
		to{opacity: 1;}
	}
	
	@keyframes zoom-in{
		from{transform: scale(0.6);}
		to{transform: scale(1);}
	}
	
	@keyframes loading{
		from{transform: rotateZ(0deg);}
		to{transform: rotateZ(360deg);}
	}
	
	/* tip文字颜色 */
	.tip-color-loading{
		color: #555555;
	}
	.tip-color-success{
		color: #4190F5;
	}
	.tip-color-error{
		color: #FF3B30;
	}
	
	.container{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0,0,0,0.5);
		animation: fade-in 200ms forwards;
	}
	
	.card{
		width: 600rpx;
		padding: 40rpx 40rpx 70rpx 40rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6px;
		position: absolute;
		top: 30%;
		left: calc(50% - 300rpx);
		animation: zoom-in 200ms forwards;
	}
	
	.title{
		font-size: 30rpx;
		color: #000000;
		font-weight: bold;
		margin-bottom: 64rpx;
		text-align: center;
	}
	.icon{
		display: block;
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto;
		margin-bottom: 64rpx;
	}
	.loading{
		animation: loading 1200ms infinite linear;
	}
	.tip{
		font-size: 28rpx;
		text-align: center;
	}
</style>

