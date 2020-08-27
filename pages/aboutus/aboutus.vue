<template>
	<view class="container">
		
		<!-- 页面主体 -->
		<view class="main">
			
			<view class="main-info">
				<!-- 公司图片 -->
				<view class="header">
					<image class="header-image" :src="'http://' + detail.img" mode="aspectFill" />
				</view>
				
				<!-- 公司名称 -->
				<view class="company-name-zh">
					重庆享动科技有限公司
				</view>
				<view class="company-name-en">
					CHONGQING XIANGDONG TECHNOLOGY CO. LTD
				</view>
				<view class="space-line"></view>
				
				<!-- 公司简介 -->
				<view class="detail">{{detail.title}}</view>
			</view>
			
			<!-- 页脚联系方式 -->
			<view class="footer">
				<view class="logo">
					<image src="../../static/image/logo.png" mode=""></image>
				</view>
				<view class="footer-info">
					<view class="footer-info-item">
						<text>电话：</text>
						<text class="tel">{{detail.telephone}}</text>
					</view>
					<view class="footer-info-item">
						<text>邮箱：</text>
						<text>{{detail.email}}</text>
					</view>
					<view class="footer-info-item">
						<text>地址：</text>
						<text>{{detail.address}}</text>
					</view>
					<view class="footer-info-item">
						<text>工作时间：</text>
						<text>{{detail.working_day}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../service/request.js'
	
	export default {
		data: () => ({
			detail: {}
		}),
		onLoad: async function() {
			var res = await request.post('/about_us/index')
			this.detail = res.data
		}
	}
</script>

<style scoped>
	.main{
		background-color: #F9F9F9;
	}
	
	.header{
		padding: 30rpx;
		box-sizing: border-box;
	}
	.header-image{
		width: 690rpx;
		height: 378rpx;
		border-radius: 6px;
	}
	
	.main-info{
		background-color: #FFFFFF;
	}
	
	.company-name-zh, .company-name-en{
		text-align: center;
	}
	
	.company-name-zh{
		font-size: 40rpx;
		color: #000000;
		font-weight: bold;
	}
	
	.company-name-en{
		font-size: 16rpx;
		color: #B5B5B5;
	}
	
	.space-line{
		width: 80rpx;
		height: 5rpx;
		margin: 38rpx auto 45rpx auto;
		background-color: #0088FF;
		border-radius: 5rpx;
	}
	
	.detail{
		line-height: 42rpx;
		font-size: 24rpx;
		color: #000000;
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}
	
	.footer{
		padding: 30rpx 30rpx 30rpx 64rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.logo{
		width: 160rpx;
		height: 180rpx;
		border-radius: 4rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.logo image{
		width: 160rpx;
		height: 136rpx;
	}
	
	.footer-info{
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24rpx;
		color: #000000;
	}
	.tel{
		color: #0088FF;
	}
	/* .footer-info-item + .footer-info-item{
		margin-top: ;
	} */
</style>
