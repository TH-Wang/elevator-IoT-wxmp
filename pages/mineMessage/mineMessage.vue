<template>
	<view class="container">
		
		<Empty v-if="dataSource.length === 0" title="暂无消息" />
		
		<!-- 列表 -->
		<view class="list-container">
			<view
				class="card"
				v-for="item in dataSource"
				:key="item.id"
				@click="handleLinkDetail(item.id)"
			>
				
				<view class="header">
					<text class="name">{{item.title}}</text>
					<text class="time">{{item.time}}</text>
				</view>
				
				<view class="content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import worknormData from '../../data/worknorm'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Search,
			Empty
		},
		data: () => ({
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
			}
		},
		onLoad: async function() {
			var res = request.post('/message/message_list', {
				limit: 100,
				page: 1,
				type: 1
			})
			this.dataSource = res.data
		}
	}
</script>

<style scoped>	
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
		flex-shrink: 1;
		margin-left: 10rpx;
		font-size: 22rpx;
		color: #999999;
	}
	
	.content{
		margin-top: 20rpx;
		color: #999999;
		font-size: 24rpx;
	}
</style>
