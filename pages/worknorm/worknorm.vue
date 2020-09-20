<template>
	<view class="container">
		
		<Empty v-if="dataSource.length === 0" title="未发布过工作规范" />
		
		<!-- 列表 -->
		<view class="list-container">
			<view
				class="card"
				v-for="item in dataSource"
				:key="item.id"
				@click="handleLinkDetail(item.id)"
			>
				
				<view class="header">
					<text class="name ellipsis">{{item.title}}</text>
					<text class="time">{{item.time}}</text>
				</view>
				
				<uParse className="content ellipsis-twolines" :content="item.content" noData=" "></uParse>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import uParse from '../../components/u-parse/u-parse.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Search,
			Empty,
			uParse
		},
		data: () => ({
			page: 1,
			limit: 20,
			dataSource: []
		}),
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		},
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
					type: 1
				})
				this.page = this.page + 1
				if(type == 'refresh') {
					this.dataSource = res.data
				} else {
					this.dataSource.push(...res.data)
				}
			},
		},
		onLoad: async function() {
			await this.requestList()
		},
		onReachBottom: async function() {
			await this.requestList()
		},
		onPullDownRefresh: async function() {
			await this.requestList('refresh')
			uni.stopPullDownRefresh()
		}
		
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	
	.list-container{
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	.card{
		padding: 30rpx 0rpx;
	}
	.card + .card{
		border-top: solid 1px #F9F9F9;
	}
	
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.name{
		flex: 1;
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
	}
	.time{
		font-size: 22rpx;
		color: #999999;
	}
	
	.content{
		margin-top: 20rpx;
		color: #999999;
		font-size: 24rpx;
	}
</style>
