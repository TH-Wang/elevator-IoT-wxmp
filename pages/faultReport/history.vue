<template>
	<view class="container" >
		<view class="list-container">
			<view
				class="list-item"
				v-for="item in dataSource"
				:key="item.id"
			>
				<view class="header">
					<view class="title ellipsis">{{item.fautlt_attr}}</view>
					<view class="time">{{item.fault_start_time}}</view>
				</view>
				
				<view class="detail ellipsis">{{item.fault_syn}}</view>
				
				<view class="info">
					<view class="info-item">
						安全等级: {{item.security_level}}
					</view>
					<view class="info-item">
						是否困人: {{item.is_tiring}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import faultData from '../../data/fault.js'
	import request from '../../service/request.js'
	
	export default {
		props: {
			active: Boolean
		},
		data: () => ({
			dataSource: []
		}),
		computed: {
			height() {
				return this.$store.getters.hasSearchHeight
			}
		},
		watch: {
			active: async function(newValue, oldValue) {
				if(newValue){
					var res = await request.post('/maint/fault_report_list')
					this.dataSource = res.data.reverse()
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/ellipsis.css");
	
	.container{
		height: 100%;
		background-color: #F9F9F9;
		overflow-y: scroll;
	}
	.list-container{
		margin-top: 20rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
	}
	
	.list-item{
		padding: 30rpx 30rpx 38rpx 30rpx;
		width: 690rpx;
		height: 220rpx;
		margin-bottom: 30rpx;
		box-sizing: border-box;
		background-color: #F9F9F9;
		border-radius: 3px;
	}
	
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title{
		flex: 1;
		font-size: 28rpx;
		color: #000000;
	}
	.time{
		font-size: 22rpx;
		color: #999999;
	}
	
	.detail{
		margin: 20rpx 0 30rpx 0;
		font-size: 24rpx;
		color: #333333;
	}
	
	.info{
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #333333;
	}
	.info-item{
		flex: 1;
	}
</style>
