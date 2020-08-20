<template>
	<view class="container">
		<NavHeader title="绿色空间1号梯" />
		
		<view :style="height" class="page-container">
			
			<view class="base-info-container">
				<view class="item">
					<text>电梯名称</text>
					<text>奔力绿色空间{{id}}号梯</text>
				</view>
				
				<view class="item">
					<text>电梯编号</text>
					<text>545645156465</text>
				</view>
				
				<view class="item">
					<text>电梯名称</text>
					<text>奔力绿色空间1号梯</text>
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
			dataSource: [0, 1, 2, 3, 4]
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
			console.log(res.data)
		}
	}
</script>

<style scoped>
	.page-container{
		overflow-y: scroll;
	}
	
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
