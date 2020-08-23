<template>
	<view class="container">
			<!-- 步骤条 -->
			<Steps :steps="steps" :type="record.repair_type" />
			
			<!-- 处理卡片 -->
			<view class="handle-card">
				<!-- 左侧信息 -->
				<view class="handle-info">
					<text class="title">{{record.fault_attr}}</text>
					<view class="info">
						<image src="../../static/icon/repair/time.png" />
						<text>故障时间：{{record.fault_start_time}}</text>
					</view>
					<view class="info">
						<image src="../../static/icon/repair/address.png" />
						<text>故障地址：{{record.address}}</text>
					</view>
				</view>
				<!-- 右侧按钮 -->
				<view class="handle-button">
					<view class="button primary">接警</view>
					<view class="button secondary">导航</view>
				</view>
			</view>
			
			<view class="baseinfo-list">
				<view class="baseinfo-header">基本信息</view>
				
				<view class="baseinfo-item">
					<text>电梯名称</text>
					<text>{{record.ele_name}}</text>
				</view>
				<view class="baseinfo-item">
					<text>工单编号</text>
					<text>{{record.repair_sn}}</text>
				</view>
				<view class="baseinfo-item">
					<text>故障来源</text>
					<text>{{record.fault_source}}</text>
				</view>
				<view class="baseinfo-item">
					<text>故障描述</text>
					<text>{{record.fault_syn}}</text>
				</view>
			</view>
			
			<CommonButton text="去处理" @click="handleLinkHandlePage" />
			
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Steps from '../../components/Steps/Steps.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import repairData from '../../data/repair.js'
	
	export default {
		components: {
			NavHeader,
			Steps,
			CommonButton
		},
		data: () => ({
			repairId: null,
			steps: [
				{
					type: 1,
					title: '待接警',
					time: '4-11 15:11:23'
				},
				{
					type: 2,
					title: '待处理',
					time: '4-11 15:11:23'
				},
				{
					type: 3,
					title: '已到达',
					time: '4-11 15:11:23'
				},
				{
					type: 4,
					title: '已完成'
				}
			]
		}),
		computed: {
			record() {
				return repairData.all.find(i=>i.id === this.repairId)
			}
		},
		methods: {
			handleLinkHandlePage() {
				uni.navigateTo({
					url: '/pages/repairHandle/repairHandle'
				})
			}
		},
		onLoad(option) {
			this.repairId = option.id
		}
	}
</script>

<style scoped>
	.main{
		background-color: #F9F9F9;
	}
	
	.handle-card{
		height: 207rpx;
		padding: 30rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
	}
	.handle-info{
		flex: 1;
	}
	.title{
		font-size: 28rpx;
		color: #000000;
		font-weight: bold;
	}
	.info{
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #000000;
		display: flex;
		align-items: center;
	}
	.info image{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	
	.handle-button{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.button{
		width: 120rpx;
		height: 50rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		border: none;
	}
	.primary{
		background-color: #4190F5;
		color: #FFFFFF;
	}
	.secondary{
		background-color: rgba(65, 144, 245, 0.2);
		color: #4190F5;
	}
	
	.baseinfo-list{
		margin-top: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.baseinfo-header{
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: solid 1px #F9F9F9;
		text-align: center;
		font-size: 28rpx;
		color: #000000;
	}
	.baseinfo-item{
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #000000;
	}
</style>
