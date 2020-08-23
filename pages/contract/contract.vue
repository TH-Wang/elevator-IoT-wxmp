<template>
	<view class="container">
		<Tabs
			:tabs="tabs"
			:active="active"
			@switch="handleSwitchTab"
		/>
		
		<Empty v-if="dataSource.all.length === 0" title="暂无合同信息" />
		
		<swiper
			v-else
			:current="active"
			class="page-list-container"
			:duration="300"
			@change="handleSwiperChange"
		>
			<swiper-item class="swiper-item" v-for="item in repairType" :key="item.code">
				<scroll-view scroll-y class="list-container">
					<ContractCard
						v-for="record in dataSource[item.key]"
						:key="record.id"
						:record="record"
						background="rgba(253, 144, 38, .05)"
						@click="handleLinkDetail(record.id)"
					/>
					<!-- <List :dataSource="dataSource[item.key]" /> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import ContractCard from '../../components/ContractCard/ContractCard.vue'
	import request from '../../service/request.js'
	// import contractData from '../../data/contract.js'
	import List from './list.vue'
	
	export default {
		components: {
			NavHeader,
			Tabs,
			List,
			Empty,
			ContractCard
		},
		data: () => ({
			repairType: [
				{
					label: '全部合同',
					key: 'all'
				}, {
					label: '待收款',
					key: 'pay'
				}, {
					label: '执行中',
					key: 'doing'
				}
			],
			active: 0,
			dataSource: {
				all: [],
				pay: [],
				doing: []
			}
		}),
		computed: {
			tabs() {
				return this.repairType.map(i=>i.label)
			}
		},
		methods: {
			handleSwitchTab(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			},
			handleLinkDetail(id) {
				uni.navigateTo({
					url: '/pages/contractDetail/contractDetail?id=' + id
				})
			}
		},
		onLoad: async function() {
			var url = '/contracts/con_list'
			var option = { limit: 100, page: 1 }
			var res = await Promise.all([
				request.post(url, {...option, type: 0}),
				request.post(url, {...option, type: 1}),
				request.post(url, {...option, type: 2})
			])
			var data = res.map(item => item.data)
			this.dataSource = {
				all: data[0],
				pay: data[1],
				doing: data[2]
			}
			console.log(this.dataSource)
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: #F9F9F9;
	}
	
	.page-list-container{
		height: calc(100vh - 100rpx);
	}
	
	.swiper-item{
		overflow-y: scroll;
		padding: 30rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #F9F9F9;
	}
	.list-container{
		height: 100%;
	}
</style>
