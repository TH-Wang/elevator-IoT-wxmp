<template>
	<view class="container">
		<!-- 搜索框 -->
		<Search paddingBottom @search="handleSearch" />
		
		<!-- 列表 -->
		<scroll-view :scroll-y="true" class="card-container">
			<view style="height: 30rpx" />
			<view
				class="card"
				v-for="(item, index) in dataSource"
				:key="item.id"
				@click="handleLinkDetail(dataSource[index].elevator_id)"
			>
				<view class="inner">
					<view class="header">
						<view class="name ellipsis">{{item.name}}</view>
						<!-- 离线 -->
						<view v-if="item.is_online == 0" class="state">
							<image class="state-icon" src="../../static/icon/state/online.png" />
							<text class="state-text" style="color: #CCCCCC;">离线</text>
						</view>
						<!-- 在线 -->
						<view v-if="item.is_online == 1" class="state">
							<image class="state-icon" src="../../static/icon/state/online.png" />
							<text class="state-text" style="color: #4190F5;">在线</text>
						</view>
						<!-- 故障 -->
						<view v-else-if="item.is_online == 2" class="state">
							<image class="state-icon" src="../../static/icon/state/fault.png" />
							<text class="state-text" style="color: #FF3B30;">故障</text>
						</view>
						<!-- 检修 -->
						<view v-else-if="item.is_online == 3" class="state">
							<image class="state-icon" src="../../static/icon/state/overhaul.png" />
							<text class="state-text" style="color: #FD9026;">检修</text>
						</view>
					</view>
					
					<view class="info ellipsis">电梯编号：{{item.elevator_number}}</view>
					<view class="info ellipsis">使用单位：{{item.company_name ? item.company_name : ''}}</view>
					<view class="info ellipsis">
						维保人员：{{item.realname}}
						<text class="point">·</text>
						{{item.phone}}
					</view>
					<view class="info ellipsis">电梯地址：{{item.address}}</view>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import elevatorData from '../../data/elevator'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Search
		},
		data: () => ({
			dataSource: []
		}),
		computed: {
			height() {
				return this.$store.getters.hasLargeSearchHeight
			}
		},
		methods: {
			handleLinkDetail(id) {
				var url = '/pages/evaDetail/evaDetail?id=' + id
				uni.navigateTo({ url })
			},
			handleSearch: async function(value) {
				var res = await request.post('/lift/list_info', {
					lift_name: value,
					limit: 100,
					page: 1
				})
				this.dataSource = res.data
			}
		},
		onLoad: async function() {
			var res = await request.post('/lift/list_info', {
				limit: 100,
				page: 1
			})
			this.dataSource = res.data
		}
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	.container{
		height: 100vh;
		background-color: #F9F9F9;
	}
	.list-container{
		overflow-y: scroll;
	}
	
	.card-container{
		height: calc(100% - 100rpx);
		box-sizing: border-box;
		background-color: #F9F9F9;
	}
	
	.card{
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.inner{
		height: 303rpx;
		padding: 30rpx;
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
