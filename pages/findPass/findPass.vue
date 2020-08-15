<template>
	<view class="container">
		<view class="background">
			<image class="background-image" src="../../static/image/login-background.png" mode=""></image>
			<image
				class="goback-button"
				src="../../static/icon/back-white.png"
				@click="handleLinkBack"
				mode
			/>
		</view>
		
		<view class="logo-card">
			<image src="../../static/image/logo.png" mode=""></image>
		</view>
		
		<view class="title">找回密码</view>
		
		<IconInput iconImage="../../static/icon/login/tel.png">
			<input type="text" value="" placeholder="请输入绑定的手机号" />
		</IconInput>
		
		<IconInput :icon="false">
			<input type="text" value="" placeholder="请输入验证码" />
			<template v-slot:suffix>
				<view class="getcode-button">
					获取验证码
				</view>
			</template>
		</IconInput>
		
		<button type="primary" class="submit-button">确认</button>
	</view>
</template>

<script>
	import IconInput from '../../components/IconInput/IconInput.vue'
	
	export default {
		components: {
			IconInput
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
	input{
		flex: 1;
	}
	
	.background{
		width: 100%;
		height: 429rpx;
		position: relative;
	}
	.background-image{
		width: 100%;
		height: 100%;
	}
	.goback-button{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 70rpx;
		left: 30rpx;
	}
		
	.logo-card{
		margin: 0 auto;
		width: 164rpx;
		height: 164rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 1px 1px 21px rgba(0,136,255,0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translateY(-50%);
	}
	.logo-card image{
		width: 124rpx;
		height: 100rpx;
	}
	
	.title{
		width: 100%;
		text-align: center;
		margin-top: -20rpx;
		margin-bottom: 10px;
		font-size: 36rpx;
		color: #000000;
	}
	
	.getcode-button{
		margin-left: 21rpx;
		color: #4190F5;
		font-size: 24rpx;
	}
	
	.submit-button{
		width: 600rpx;
		height: 98rpx;
		margin-top: 60rpx;
		line-height: 98rpx;
		border-radius: 10px;
		font-size: 36rpx;
		text-align: center;
		background-color: #43A9FF;
	}
</style>
