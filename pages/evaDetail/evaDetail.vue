<template>
	<view class="container">
			
			<view class="base-info-container">
				<view class="item">
					<text>电梯名称</text>
					<text>{{dataSource.name}}</text>
				</view>
				
				<view class="item">
					<text>电梯编号</text>
					<text>{{dataSource.elevator_number}}</text>
				</view>
				
				<view class="item">
					<text>电梯类型</text>
					<text>{{dataSource.type}}</text>
				</view>
				
				<view class="item">
					<text>所在小区</text>
					<text>{{dataSource.village_id}}1号梯</text>
				</view>
				
				<view class="item">
					<text>详细地址</text>
					<text>{{dataSource.address}}</text>
				</view>
			</view>
			
			<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" borderType="short" />
			
			<!-- 出厂 -->
			<view v-show="active == 0">
				<view class="item" v-for="(item, index) in dataConfig.factory" :key="index">
					<text class="item-label">{{item.label}}</text>
					<text>{{dataSource[item.key]}}</text>
				</view>
			</view>
			<!-- 安装 -->
			<!-- <view v-show="active == 1">
				<view class="item" v-for="(item, index) in dataConfig.install" :key="index">
					<text class="item-label">{{item.label}}</text>
					<text>{{dataSource[item.key]}}</text>
				</view>
			</view> -->
			<!-- 维保 -->
			<view v-show="active == 1">
				<view class="item" v-for="(item, index) in dataConfig.maint" :key="index">
					<text class="item-label">{{item.label}}</text>
					<text>{{dataSource[item.key]}}</text>
				</view>
			</view>
			<!-- 故障记录 -->
			<view v-show="active == 2">
				<view class="item" v-for="(item, index) in faultList" :key="index">
					<text class="item-label">{{item.fault_syn}}</text>
					<text>{{item.fault_start_time}}</text>
				</view>
			</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import dataConfig from './dataConfig.js'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Tabs
		},
		data: () => ({
			id: 0,
			active: 0,
			tabs: ['出厂', '维保', '故障'],
			dataSource: {},
			faultList: [],
			dataConfig
		}),
		computed: {
			height() {
				return this.$store.getters.commonHeight
			},
			listHeight() {
				return this.$store.getters.hasSearchHeight
			}
		},
		methods: {
			handleTabsSwitch(idx) {
				this.active = idx
			},
			handleSwiperChange(value) {
				console.log(value)
				this.active = value
			}
		},
		onLoad: async function(option) {
			var { id } = option
			var res = await Promise.all([
				request.post('/lift/one_info', { elevator_id: id }),
				request.post('/maint/fault_info', { elevator_id: id, limit: 100, page: 1 })
			])
			this.dataSource = res[0].data
			this.faultList = res[1].data
		}
	}
</script>

<style scoped>
	.base-info-container{
		padding-bottom: 20rpx;
		background-color: #F9F9F9;
	}
	
	.item{
		padding: 30rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #000000;
	}
	.item-label{
		margin-right: 10rpx;
	}
</style>
