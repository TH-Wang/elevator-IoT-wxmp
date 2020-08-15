<template>
	<view class="container">
		<view class="background">
			<image class="background-image" src="../../static/image/login-background.png" mode=""></image>
		</view>
		
		<view class="logo-card">
			<image src="../../static/image/logo.png" mode=""></image>
		</view>
		
		<view class="title">账号登录</view>
		
		<IconInput iconImage="../../static/icon/login/code.png">
			<input type="text" value="" placeholder="通道号" />
		</IconInput>
		
		<IconInput iconImage="../../static/icon/login/tel.png">
			<input type="text" value="" placeholder="请输入账号" />
		</IconInput>
		
		<IconInput iconImage="../../static/icon/login/password.png">
			<input type="password" value="" placeholder="请输入密码" />
		</IconInput>
		
		<view class="bottom-button">
			<view class="remember-password-button">
				<image class="remember-password-icon" src="../../static/icon/login/unchecked.png" mode />
				<text class="remember-password-text">记住密码</text>
			</view>
			<view class="forget-password-button" @click="handleLinkFindPass">
				忘记密码？
			</view>
		</view>
		
		<button type="primary" class="submit-button">登录</button>
		
		<view class="scan-button">
			<image src="../../static/icon/login/scan.png" mode=""></image>
		</view>
		<view class="scan-text">
			扫一扫，了解电梯详情
		</view>
	</view>
</template>

<script>
	import IconInput from '../../components/IconInput/IconInput.vue'
	
	export default {
		components: {
			IconInput
		},
		methods: {
			handleLinkFindPass() {
				uni.navigateTo({
					url: '../findPass/findPass'
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
	}
	.background-image{
		width: 100%;
		height: 100%;
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
		font-size: 36rpx;
		color: #000000;
	}
	
	.bottom-button{
		width: 600rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.remember-password-button{
		display: flex;
		align-items: center;
	}
	.remember-password-icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 22rpx;
	}
	.remember-password-text{
		height: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}
	
	.forget-password-button{
		font-size: 24rpx;
		color: #4190F5;
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
	
	.scan-button{
		width: 56rpx;
		height: 56rpx;
		margin: 0 auto;
		margin-top: 88rpx;
	}
	.scan-button image{
		width: 100%;
		height: 100%;
	}
	.scan-text{
		width: 100%;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		font-size: 24rpx;
		color: #666666;
	}
</style>
