<template>
	<view class="container">
		<swiper
			class="swiper"
			:indicator-dots="true"
			indicator-color="rgba(255, 255, 255, .5)"
			indicator-active-color="#4190F5"
			:autoplay="true"
			:circular="true"
			:interval="3000"
			:duration="500"
		>
			<swiper-item v-for="item in swiperList" :key="item">
				<view class="swiper-item">
					<image class="swper-image" src="../../static/image/index-swiper.jpg" mode />
				</view>
			</swiper-item>
		</swiper>
		
		<view class="notice">
			<image class="notice-image" src="../../static/icon/notice.png" mode />
			<swiper
				class="notice-swiper"
				:vertical="true"
				:autoplay="true"
				:circular="true"
				:interval="3000"
				:duration="300"
			>
				<swiper-item class="notice-swiper-item" v-for="(item, index) in noticeList" :key="index">
					<text class="notice-title">{{item}}</text>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="grid">
			<view class="grid-item" v-for="(item, index) in gridList" :key="item">
				<image class="grid-image" :src="`../../static/icon/grid/grid-${index+1}.png`" mode />
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: () => ({
			swiperList: ['1', '2', '3'],
			noticeList: [
				'这里是后台的系统公告市规划局三个世界观和三个',
				'这里是后台的系统公告',
				'市规划局三个世界观和三个价值观'
			],
			gridList: ['电梯监控', 'GIS地图', '合同管理', '急修管理', '电梯保养', '故障上报', '档案资料', '设备调试']
		}),
		methods: {
	
		}
	}
</script>

<style scoped>
	.container{
		background-color: #f9f9f9;
	}
	
	.swiper{
		height: 345rpx;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.swper-image{
		width: 100%;
		height: 100%;
	}
	
	.notice{
		height: 100rpx;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		background-color: #FFFFFF;
	}
	.notice-image{
		margin: 0 30rpx 0 45rpx;
		width: 36rpx;
		height: 32rpx;
	}
	.notice-swiper{
		width: calc(100% - 120rpx);
		height: 60%;
	}
	.notice-swiper-item{
		width: 100%;
		display: flex;
		align-items: center;
		height: 100%;
	}
	.notice-title{
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	
	.grid{
		width: 100%;
		height: 378rpx;
		padding: 30rpx 0;
		background-color: #FFFFFF;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-content: space-between;
	}
	.grid-item{
		width: 22%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
	}
	.grid-image{
		width: 85rpx;
		height: 85rpx;
		margin-bottom: 21rpx;
	}
</style>
