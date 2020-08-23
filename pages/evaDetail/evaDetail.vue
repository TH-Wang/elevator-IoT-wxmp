<template>
	<view class="container">
			
			<view class="base-info-container">
				<view class="item">
					<text>电梯名称</text>
					<text>{{info.name}}</text>
				</view>
				
				<view class="item">
					<text>电梯编号</text>
					<text>{{info.elevator_number}}</text>
				</view>
				
				<view class="item">
					<text>电梯类型</text>
					<text>{{info.variety}}</text>
				</view>
				
				<view class="item">
					<text>电梯名称</text>
					<text>奔力绿色空间1号梯</text>
				</view>
			</view>
			
			<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" borderType="short" />
			<view class="detail-info-container" :style="listHeight">
				<view class="item" v-for="item in dataSource" :key="item">
					<text>电梯名称</text>
					<text>奔力绿色空间{{id}}号梯</text>
				</view>
			</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Tabs
		},
		data: () => ({
			id: 0,
			active: 0,
			tabs: ['出厂', '安装', '维保', '故障', '部件'],
			dataSource: [0, 1, 2, 3, 4],
			info: {}
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
			}
		},
		onLoad: async function(option) {
			var {id} = option
			var res = await request.post('/lift/one_info', {
				elevator_id: id
			})
			this.info = res.data
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
</style>
