<template>
	<view class="">
		<NavHeader title="档案资料" />

		<view :style="height">
			<Tabs
				:tabs="tabs"
				:active="active"
				@switch="handleSwitchTab"
			/>
			<swiper
				:current="active"
				class="page-list-container"
				:duration="400"
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
	import repairData from '../../data/repair.js'
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
					label: '待处理'
				}, {
					code: 1,
					label: '进行中'
				}, {
					code: 2,
					label: '已完成'
				}, {
					code: 3,
					label: '全部'
				}
			],
			active: 0,
			dataSource: repairData
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
				if(code === 3) return this.dataSource
				else return this.dataSource.filter(i => i.code === code)
			}
		},
		onLoad() {
			console.log(this.height)
		}
	}
</script>

<style>
	@import url("../../static/css/list-page.css");
</style>
