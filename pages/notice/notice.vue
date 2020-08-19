<template>
	<view class="container">
		<NavHeader title="系统公告" />
		
		<Empty v-if="dataSource.length === 0" title="暂无公告" />
		
		<view v-else class="list-container" :style="height">
			<view
				class="card"
				v-for="item in dataSource"
				:key="item.id"
				@click="handleLinkDetail(item.id)"
			>
				<view class="title">{{item.title}}</view>
				<view class="content ellipsis-twolines">{{item.content}}</view>
				<view class="time">系统公告 | {{item.add_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Empty from '../../components/Empty/Empty.vue'
	// import noticeData from '../../data/notice.js'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Empty
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		},
		data: () => ({
			dataSource: []
		}),
		methods: {
			handleLinkDetail(id) {
				var url = '/pages/noticeDetail/noticeDetail?id=' + id
				uni.navigateTo({ url })
			}
		},
		onLoad: async function() {
			var res = await request.post(this.$store.state.request.url + '/api/jobs/lists', {
				limit: 10,
				page: 1,
				type: 0
			})
			this.dataSource = res.data
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
		overflow-y: scroll;
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
