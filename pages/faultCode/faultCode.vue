<template>
	<view class="container">
		<!-- 搜索框 -->
		<Search paddingBottom />
		
		<Empty v-if="isEmpty" title="暂无数据" />
		
		<!-- 顶部 -->
		<view v-if="!isEmpty" class="header">
			<view class="dropdown-container">
				<van-dropdown-menu active-color="#4190F5">
					<van-dropdown-item
						:value="eleValue"
						:options="eleOptions"
						@change="handleEleChange"
					/>
					<van-dropdown-item
						:value="faultValue"
						:options="faultOptions"
						@change="handleFaultChange"
					/>
				</van-dropdown-menu>
			</view>
			<view class="total">
				共找到 <text style="color:#4190F5">{{total}}条</text> 数据
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="list-container">
			<view class="list-item" v-for="item in showDataList" :key="item.f_id">
				<view class="title">
					<text>{{item.e_code}}</text>
					<text class="point">·</text>
					<text>{{faultOptions[faultValue].text}}</text>
				</view>
				<view class="list-info">电梯型号：{{eleOptions[eleValue].text}}</view>
				<view class="list-info">故障描述：{{item.fault}}</view>
				<view class="list-info">解决办法：{{item.solve}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Search from '../../components/Search/Search.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import request from '../../service/request.js'
	import faultCodeData from '../../data/faultCode.js'
	
	export default {
		components: {
			Search,
			Empty
		},
		data: () => ({
			faultOptions: [],
			faultValue: null,
			eleOptions: [],
			eleValue: null,
			isEmpty: false,
			dataSource: [],
			total: 0
		}),
		computed: {
			showDataList() {
				return this.dataSource.length > 0 ? this.dataSource[this.faultValue].child : []
			}
		},
		methods: {
			handleEleChange(e) {
				this.eleValue = e.detail
			},
			handleFaultChange(e) {
				this.faultValue = e.detail
			}
		},
		onLoad: async function() {
			// 电梯型号
			var eleRes = await request.post('/maint/fault_code_model')
			// 若没有数据，显示暂无数据
			if(eleRes.data.length == 0) {
				// this.isEmpty = true
				return
			}
			// 设置电梯型号选项
			var eleList = eleRes.data.map((item, index) => ({
				text: item.model_name,
				value: index,
				devices_id: item.model_id
			}))
			this.eleOptions = eleList
			this.eleValue = 0
		},
		watch: {
			eleValue: async function (newValue, oldValue) {
				try{
					var _this_ = this
					// 请求故障类型
					var faultRes = await request.post('/maint/fault_code', {
						devices_id: _this_.eleOptions[newValue].devices_id,
					})
					// 故障类型下拉选项
					this.faultOptions = faultRes.data.map((el, index) => ({
						text: el.fault_id,
						value: index
					}))
					this.faultValue = 0
					this.dataSource = faultRes.data
				}catch(err){
					console.log(err)
				}
			},
			faultValue: function(newValue, oldValue) {
				// 总共多少条数据
				this.total = this.dataSource[newValue].child.length
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color: #F9F9F9;
	}
	
	.header{
		margin-top: 20rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 90rpx;
		position: sticky;
		top: 0;
		left: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.dropdown-container{
		width: 50%;
		font-size: 24rpx;
		color: #000000;
	}
	.total{
		font-size: 24rpx;
		color: #999999;
	}
	
	.list-container{
		background-color: #FFFFFF;
		padding-top: 1px;
	}
	.list-item{
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border: solid 1px #F9F9F9;
		border-radius: 6rpx;
	}
	.title{
		font-size: 24rpx;
		color: #000000;
		margin-bottom: 30rpx;
	}
	.point{
		margin: 0 40rpx;
	}
	.list-info{
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #666666;
	}
</style>
<style>
	.van-ellipsis{
		font-size: 24rpx;
	}
</style>
