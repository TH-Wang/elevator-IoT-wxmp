<template>
	<TabbarPage :header="{title: '急修', hasBack: false}" :tabbar="{active: 2}">
		<view :style="height">
			<!-- 搜索框 -->
			<Search button />
			
			<!-- 分类导航栏 -->
			<Tabs
				:tabs="tabs"
				:active="active"
				@switch="handleSwitchTab"
			/>
			
			<!-- 列表 -->
			<swiper
				:current="active"
				class="page-list-container"
				:duration="300"
				@change="handleSwiperChange"
			>
				<swiper-item
					class="swiper-item"
					v-for="item in repairType"
					:key="item.code"
				>
					<view class="list-container">
						<List :dataSource="getList(item.code)" />
					</view>
				</swiper-item>
			</swiper>
		</view>
	</TabbarPage>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import repairData from '../../data/repair.js'
	import List from './list.vue'
	
	export default {
		components: {
			TabbarPage,
			Tabs,
			Search,
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
			dataSource: repairData,
			overflowStyle: ''
		}),
		computed: {
			tabs() {
				return this.repairType.map(i=>i.label)
			},
			height() {
				return this.$store.getters.tabbarHeight
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
		}
	}
</script>

<style>
	@import url("../../static/css/page.css");
	@import url("../../static/css/list-page.css");
</style>