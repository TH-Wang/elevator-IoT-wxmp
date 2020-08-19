<template>
	<TabbarPage :header="{title: '首页', hasBack: false}" :tabbar="{active: 0}">
		<view class="container" :style="height">
			<!-- banner -->
			<swiper
				class="swiper"
				:indicator-dots="true"
				indicator-color="rgba(255, 255, 255, .5)"
				indicator-active-color="#4190F5"
				:autoplay="true"
				:circular="true"
				:interval="5000"
				:duration="500"
			>
				<swiper-item v-for="item in swiperList" :key="item">
					<view class="swiper-item">
						<image class="swper-image" src="../../static/image/index-swiper.jpg" mode />
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 搜索框 -->
			<Search @click-button="handleClickButton" @change="handleSearchChange" button />
			
			<!-- 公告 -->
			<view class="notice" @click="handleLinkNotice">
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
			
			<!-- 导航菜单 -->
			<view class="grid">
				<view
					class="grid-item"
					v-for="(item, index) in gridConfig"
					:key="item.text"
					@click="handleNavigateLink(item.path, item.isTabbarPage)"
				>
					<image class="grid-image" :src="`../../static/icon/grid/grid-${index+1}.png`" mode />
					<text>{{item.text}}</text>
				</view>
			</view>
			
			<!-- 待办事项 -->
			<view class="todos-title">
				<text>待办事项</text>
				<text><text style="color: #4190F5;">2</text>项</text>
			</view>
			
		</view>
	</TabbarPage>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Search from '../../components/Search/Search.vue'
	import gridConfig from './gridConfig.js'
	import debounce from '../../utils/debounce.js'
	
	export default {
		components: {
			TabbarPage,
			Search
		},
		data: () => ({
			swiperList: ['1', '2', '3'],
			noticeList: [
				'这里是后台的系统公告市规划局三个世界观和三个',
				'这里是后台的系统公告',
				'市规划局三个世界观和三个价值观'
			],
			gridConfig,
			value: ''
		}),
		computed: {
			height() {
				return this.$store.getters.tabbarHeight
			}
		},
		methods: {
			handleNavigateLink(path, isTabbarPage) {
				const option = {url: path}
				if(isTabbarPage) uni.reLaunch(option)
				else uni.navigateTo(option)
			},
			handleSearchChange: debounce(function(value) {
				console.log(value)
			}, 300),
			handleClickButton() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})
			},
			handleLinkNotice(){
				uni.navigateTo({url: '/pages/notice/notice'})
			}
		},
		mounted() {
			// console.log(this.$store.state.request.url)
			// console.log(this.$store.state.user.info)
		}
	}
</script>

<style>
	@import url("../../static/css/page.css");
</style>

<style scoped>
	/* 页面容器 */
	.container{
		background-color: #f9f9f9;
	}
	
	/* banner */
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
	
	/* 公告 */
	.notice{
		height: 100rpx;
		margin-bottom: 20rpx;
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
		font-size: 26rpx;
		color: #000000;
	}
	
	/* 导航菜单 */
	.grid{
		width: 100%;
		height: 378rpx;
		padding: 30rpx 0;
		margin-bottom: 20rpx;
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
	
	/* 待办事项 */
	.todos-title{
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #000000;
		background-color: #FFFFFF;
		border-bottom: solid 1px #EEEEEE;
	}
</style>
