<template>
	<view class="container">
		<!-- 标题导航栏 -->
		<NavHeader title="关于我们" />
		
		<!-- 页面主体 -->
		<scroll-view :scroll-y="true" class="main" :style="height">
			
			<view class="main-info">
				<!-- 公司图片 -->
				<view class="header">
					<image class="header-image" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3547277651,1427004120&fm=26&gp=0.jpg" mode="aspectFill" />
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
				<view class="detail">
							在公司发展壮大的5年里，我们始终为客户提供好的产品和技术支持、健全的售后
					服务，我公司主要经营互联网信息技术开发、咨询、服务；网络推广；计算机软
					硬件开发、咨询、销售；计算机系统集成；文体活动策划。在公司发展壮大的5年
					里，我们始终为客户提供好的产品和技术支持、健全的售后服务，我公司主要经营
					互联网信息技术开发、咨询、服务；网络推广；计算机软硬件开发、咨询、销售；
					计算机系统集成；文体活动策划。在公司发展壮大的5年里，我们始终为客户提供好
					的产品和技术支持、健全的售后服务，我公司主要经营互联网信息技术开发、咨询、
					服务；网络推广；计算机软硬件开发、咨询、销售；计算机系统集成；文体活动策划。
					计算机系统集成；文体活动策划。在公司发展壮大的5年里，我们始终为客户提供好的
					产品和技术支持、健全的售后服务，我公司主要经营互联网信息技术开发、咨询、服
					务；网络推广；计算机软硬件开发、咨询、销售；计算机系统集成；文体活动策划。
					计算机系统集成；文体活动策划。在公司发展壮大的5年里。
				</view>
			</view>
			
			<!-- 页脚联系方式 -->
			<view class="footer">
				<view class="logo">
					<image src="../../static/image/logo.png" mode=""></image>
				</view>
				<view class="footer-info">
					<view class="footer-info-item">
						<text>电话：</text>
						<text class="tel">023-66863595</text>
					</view>
					<view class="footer-info-item">
						<text>邮箱：</text>
						<text>15875412544@163.com</text>
					</view>
					<view class="footer-info-item">
						<text>地址：</text>
						<text>重庆市渝中区朝天门409号</text>
					</view>
					<view class="footer-info-item">
						<text>工作时间：</text>
						<text>9:00 - 18:00</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	
	export default {
		components: {
			NavHeader
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
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
