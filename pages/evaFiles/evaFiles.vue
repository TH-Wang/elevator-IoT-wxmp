<template>
	<view class="container">
		<NavHeader title="电梯档案" />
		<!-- 搜索框 -->
		<Search button paddingBottom />
		
		<!-- 列表 -->
		<view class="list-container" :style="height">
			<view class="card-container">
				<view
					class="card"
					v-for="item in dataSource"
					:key="item.id"
					@click="handleLinkDetail(item.id)"
				>
					
					<view class="header">
						<view class="name ellipsis">{{item.name}}</view>
						<!-- 在线 -->
						<view v-if="item.state === 1" class="state">
							<image class="state-icon" src="../../static/icon/state/online.png" />
							<text class="state-text" style="color: #4190F5;">在线</text>
						</view>
						<!-- 故障 -->
						<view v-else-if="item.state === 2" class="state">
							<image class="state-icon" src="../../static/icon/state/fault.png" />
							<text class="state-text" style="color: #FF3B30;">故障</text>
						</view>
						<!-- 检修 -->
						<view v-else-if="item.state === 3" class="state">
							<image class="state-icon" src="../../static/icon/state/overhaul.png" />
							<text class="state-text" style="color: #FD9026;">检修</text>
						</view>
					</view>
					
					<view class="info ellipsis">电梯编号：{{item.code}}</view>
					<view class="info ellipsis">使用单位：{{item.company}}</view>
					<view class="info ellipsis">
						维保人员：{{item.people}}
						<text class="point">·</text>
						{{item.tel}}
					</view>
					<view class="info ellipsis">电梯地址：{{item.address}}</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import elevatorData from '../../data/elevator'
	
	export default {
		components: {
			NavHeader,
			Search
		},
		data: () => ({
			dataSource: elevatorData
		}),
		computed: {
			height() {
				return this.$store.getters.hasLargeSearchHeight
			}
		},
		methods: {
			handleLinkDetail(id) {
				var url = '/pages/evaDetail/evaDetail?id=' + id
				console.log(url)
				uni.navigateTo({ url })
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	
	.list-container{
		background-color: #F9F9F9;
		overflow-y: scroll;
	}
	
	.card-container{
		margin-top: 22rpx;
		padding: 1rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	.card{
		height: 303rpx;
		padding: 30rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		border: solid 1px #EEEEEE;
		border-radius: 3px;
	}
	
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.name{
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
	}
	
	.state{
		display: flex;
		align-items: center;
	}
	.state-icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}
	.state-text{
		font-size: 24rpx;
	}
	
	.info{
		margin-top: 17rpx;
		font-size: 24rpx;
		color: #666666;
	}
	.point{
		margin: 0 14rpx;
	}
</style>
