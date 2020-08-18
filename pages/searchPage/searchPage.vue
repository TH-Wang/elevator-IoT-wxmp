<template>
	<view class="container">
		<!-- 标题导航栏 -->
		<NavHeader title="搜索" />
		
		<!-- 页面主体 -->
		<scroll-view :scroll-y="false" class="main" :style="height">
			<!-- 搜索框 -->
			<Search paddingBottom />
			
			<!-- 热门搜索卡片 -->
			<view class="hot-card">
				<Title title="热门搜索">
				</Title>
				
				<view class="hot-tag-box">
					<view
						class="tag"
						v-for="(tag, index) in tags"
						:key="index"
						:style="'background-color:' + tag.color"
					>
						{{tag.label}}
					</view>
				</view>
			</view>
			
			<!-- 历史搜索列表 -->
			<view class="history">
				<Title title="历史搜索">
					<template v-slot:suffix>
						<view class="clear-history">清除历史</view>
					</template>
				</Title>
				
				<view class="history-list">
					<view class="history-item" v-for="(item, index) in historyList" :key="index">
						<image class="history-icon" src="../../static/icon/search/time.png" />
						<view class="history-title ellipsis">{{item}}</view>
						<image class="history-icon" src="../../static/icon/search/remove.png" />
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import Title from '../../components/Title/Title.vue'
	
	export default {
		components: {
			NavHeader,
			Search,
			Title
		},
		data: () => ({
			tags: [
				{
					label: '故障点',
					color: 'rgba(65, 144, 245, 0.15)'
				}, {
					label: '急修工单',
					color: 'rgba(33, 207, 207, 0.15)'
				}, {
					label: '管理人员',
					color: 'rgba(255, 141, 135, 0.15)'
				}, {
					label: '特大洪灾',
					color: 'rgba(253, 144, 38, 0.15)'
				}
			],
			historyList: ['今日洪水过境','今日洪水过境','今日洪水过境']
		}),
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
	
	.hot-card{
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}
	.hot-tag-box{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.tag{
		color: #000000;
		font-size: 24rpx;
		padding: 12rpx 28rpx;
		margin: 0 30rpx 30rpx 0;
		border-radius: 6rpx;
		display: inline-block;
	}
	
	.history{
		height: 100vh;
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}
	.clear-history{
		heigth: 100%;
		padding-left: 30rpx;
		font-size: 22rpx;
		color: #666666;
	}
	.history-list{
		margin: 0 30rpx;
		border-top: solid 1px #F9F9F9;
	}
	.history-item{
		padding: 20rpx 0;
		display: flex;
		align-items: center;
	}
	.history-title{
		flex: 1;
		margin: 0 8rpx;
		font-size: 24rpx;
		color: #000000;
	}
	.history-icon{
		width: 20rpx;
		height: 20rpx;
	}
</style>
