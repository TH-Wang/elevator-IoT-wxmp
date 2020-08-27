<template>
	<view class="container">
			<!-- 步骤条 -->
			<Steps :steps="steps" :type="record.repair_type" />
			
			<!-- 处理卡片 -->
			<view class="handle-card">
				<!-- 左侧信息 -->
				<view class="handle-info">
					<text class="title">{{record.fault_syn}}</text>
					<view class="info">
						<image src="../../static/icon/repair/time.png" />
						<text>故障时间：{{record.fault_start_time}}</text>
					</view>
					<view class="info">
						<image src="../../static/icon/repair/address.png" />
						<text>故障地址：{{ele.address}}</text>
					</view>
				</view>
				<!-- 右侧按钮 -->
				<view class="handle-button">
					<!-- 接警按钮 -->
					<view
						v-if="authority && record.repair_type == 1"
						class="button primary"
						@click="handleAlarm"
					>接警</view>
					<!-- 签到按钮 -->
					<view
						v-if="authority && record.repair_type == 2"
						class="button primary"
						@click="handleSignIn"
					>签到</view>
					<view
						v-if="authority && record.repair_type < 2"
						class="button secondary"
					>导航</view>
				</view>
			</view>
			
			<view class="baseinfo-list">
				<view class="baseinfo-header">基本信息</view>
				
				<view class="baseinfo-item">
					<text>电梯名称</text>
					<text>{{ele.name}}</text>
				</view>
				<view class="baseinfo-item">
					<text>工单编号</text>
					<text>{{record.repair_sn}}</text>
				</view>
				<view class="baseinfo-item">
					<text>故障来源</text>
					<text>{{fault_source}}</text>
				</view>
				<view class="baseinfo-item">
					<text>故障描述</text>
					<text>{{record.fault_syn}}</text>
				</view>
				<view class="baseinfo-item">
					<text>发生时间</text>
					<text>{{record.fault_start_time}}</text>
				</view>
				<view class="baseinfo-item">
					<text>维保人员</text>
					<text>{{ele.user_name}}</text>
				</view>
				<view class="baseinfo-item">
					<text>联系方式</text>
					<text>{{record.fault_start_time}}</text>
				</view>
			</view>
			
			<CommonButton
				v-if="authority && record.repair_type == 3"
				text="去处理"
				@click="handleLinkHandlePage"
			/>
			
			<!-- 签到成功弹窗 -->
			<SignInModal :visible="signInSuccess" @close="signInSuccess = false" />
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Steps from '../../components/Steps/Steps.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import SignInModal from '../../components/SignInModal/SignInModal.vue'
	import repairData from '../../data/repair.js'
	import request from '../../service/request.js'
	import formatDate from '../../utils/formatDate.js'
	
	export default {
		components: {
			NavHeader,
			Steps,
			CommonButton,
			SignInModal
		},
		data: () => ({
			steps: [
				{
					type: 1,
					title: '待接警',
					time: ''
				},
				{
					type: 2,
					title: '待处理',
					time: ''
				},
				{
					type: 3,
					title: '已到达',
					time: ''
				},
				{
					type: 4,
					title: '已完成',
					time: ''
				}
			],
			record: {},
			ele: {},
			signInSuccess: false
		}),
		computed: {
			fault_source() {
				return this.record.fault_source == 0 ? '电梯自动报警' : '用户报警'
			},
			jobs() {
				return this.$store.state.user.info.jobs
			},
			authority() {
				return Boolean(this.record.is_authority)
			}
		},
		methods: {
			handleLinkHandlePage() {
				uni.navigateTo({
					url: '/pages/repairHandle/repairHandle'
				})
			},
			// 点击接警
			async handleAlarm() {
				await this.updateTicketState(2)
			},
			// 点击签到
			async handleSignIn() {
				await this.updateTicketState(3)
				this.signInSuccess = true
			},
			// 变更工单
			async updateTicketState(type) {
				var _this_ = this
				var res = await request.post('/maint/fault_submit', {
					id: _this_.record.id,
					type,
					content: ''
				})
				if(res.code == 1) {
					this.steps = this.steps.map(item => {
						if(item.type == type) item.time = formatDate('YYYY-mm-dd HH:MM:SS', new Date())
						return item
					})
					this.record.repair_type = type
				}
			}
		},
		onLoad: async function(option) {
			var _this_ = this
			var { id } = option
			var res = await request.post('/maint/fault_one', {id})
			this.record = res.data.repair
			this.ele = res.data.ele
			var newSteps = this.steps
			newSteps.forEach(item => {
				var hasTime = res.data.repair.log_time.find(i=>i.type==item.type)
				if(hasTime) item.time = hasTime.time
			})
			this.steps = newSteps
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
		width: 28rpx;
		height: 28rpx;
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
