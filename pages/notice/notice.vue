<template>
	<view class="container">
		<Empty v-if="dataSource.length === 0" title="暂无公告" />
		
		<scroll-view v-else class="list-container" :lower-threshold="100" @scrolltolower="handleScrollToLower">
			<view
				class="card"
				v-for="item in dataSource"
				:key="item.id"
				@click="handleLinkDetail(item.id)"
			>
				<view class="title">{{item.title}}</view>
				<uParse className="content ellipsis-twolines" :content="item.content" noData=" "></uParse>
				<view class="time">系统公告 | {{item.add_time}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Empty from '../../components/Empty/Empty.vue'
	import uParse from '../../components/u-parse/u-parse.vue'
	import noticeData from '../../data/notice.js'
	import request from '../../service/request.js'
	
	export default {
		components: {
			Empty,
			uParse
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		},
		data: () => ({
			page: 1,
			limit: 20,
			dataSource: []
		}),
		methods: {
			handleLinkDetail(id) {
				var url = '/pages/noticeDetail/noticeDetail?id=' + id
				uni.navigateTo({ url })
			},
			requestList: async function(type) {
				var _this_ = this
				if(type && type == 'refresh') this.page = 1
				if(this.dataSource % this.limit > 0) return
				var res = await request.post('/jobs/lists', {
					limit: _this_.limit,
					page: _this_.page,
					type: 0,
				})
				if(res.code == 1) {
					if(type == 'refresh') {
						this.dataSource = res.data
					} else {
						this.dataSource.push(...res.data)
					}
					this.page = this.page + 1 
				}
			},
			handleScrollToLower: async function() {
				await this.requestList()
			}
		},
		onLoad: async function() {
			await this.requestList()
		},
		onPullDownRefresh: async function() {
			await this.requestList('refresh')
			uni.stopPullDownRefresh()
		}
	}
</script>

<style scoped>
	/* 两行省略号 */
	.ellipsis-twolines{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.list-container{
		height: 100vh;
		padding: 1rpx 30rpx 30rpx 30rpx;
		background-color: #F9F9F9;
		box-sizing: border-box;
	}
	.card{
		margin-top: 30rpx;
		padding: 25rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, .05);
	}
	
	.title{
		font-size: 28rpx;
		color: #000000;
	}
	.content{
		font-size: 24rpx;
		color: #666666;
		margin: 20rpx 0;
	}
	.time{
		font-size: 22rpx;
		color: #999999;
	}
</style>
