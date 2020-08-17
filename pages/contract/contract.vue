<template>
	<view class="">
		<NavHeader title="合同管理" />
	
		<view :style="height">
			<Tabs
				:tabs="tabs"
				:active="active"
				@switch="handleSwitchTab"
			/>
			<swiper
				:current="active"
				class="page-list-container"
				:duration="300"
				@change="handleSwiperChange"
			>
				<swiper-item class="swiper-item" v-for="item in repairType" :key="item.code">
					<view class="list-container">
						<List :dataSource="getList(item.code)" />
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import contractData from '../../data/contract.js'
	import List from './list.vue'
	
	export default {
		components: {
			NavHeader,
			Tabs,
			List
		},
		data: () => ({
			repairType: [
				{
					code: 0,
					label: '全部合同'
				}, {
					code: 1,
					label: '待收款'
				}, {
					code: 2,
					label: '待续签'
				}
			],
			active: 0,
			dataSource: contractData
		}),
		computed: {
			tabs() {
				return this.repairType.map(i=>i.label)
			},
			height() {
				return this.$store.getters.commonHeight
			}
		},
		methods: {
			handleSwitchTab(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			},
			getList(code) {
				if(code !== 1 && code !== 2) return this.dataSource
				else return this.dataSource.filter(i => i.code === code)
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
