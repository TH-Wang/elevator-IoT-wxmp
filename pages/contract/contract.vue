<template>
	<view class="">
		<NavHeader title="合同管理" />
	
		<view :style="height">
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
					<view class="list-container">
						<ContractCard
							v-for="record in dataSource[item.key]"
							:key="record.id"
							:record="record"
							background="rgba(253, 144, 38, .05)"
							@click="handleLinkDetail(record.id)"
						/>
						<!-- <List :dataSource="dataSource[item.key]" /> -->
					</view>
				</swiper-item>
			</swiper>
		</view>
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
					code: 0,
					label: '全部合同',
					key: 'all'
				}, {
					code: 1,
					label: '待收款',
					key: 'pay'
				}, {
					code: 2,
					label: '待续签',
					key: 'renew'
				}
			],
			active: 0,
			dataSource: {
				all: [],
				pay: [],
				renew: []
			}
		}),
		computed: {
			tabs() {
				return this.repairType.map(i=>i.label)
			},
			height() {
				return this.$store.getters.commonHeight
			},
			handleLinkDetail(id) {
				uni.navigateTo({
					url: '/pages/contractDetail/contractDetail?id=' + id
				})
			}
		},
		methods: {
			handleSwitchTab(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			}
		},
		onLoad: async function() {
			var url = this.$store.state.request.url + '/api/jobs/lists'
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
				renew: data[2]
			}
		}
	}
</script>

<style scoped>
	.page-list-container{
		height: calc(100% - 100rpx);
	}
	
	.swiper-item{
		overflow-y: scroll;
		padding: 30rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #F9F9F9;
	}
</style>
