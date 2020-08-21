<template>
		<scroll-view
			:scroll-y="true"
		>
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
				:style="mainheight"
				@change="handleSwiperChange"
			>
				<swiper-item
					class="swiper-item"
					v-for="item in repairType"
					:key="item.code"
				>
					<scroll-view class="list-container">
						<RepairCard
							v-for="record in dataSource[item.key]"
							:key="record.id"
							:record="record"
							@click="handleLinkDetail(record.id)"
						/>
					</scroll-view>
				</swiper-item>
			</swiper>
		</scroll-view>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	import repairData from '../../data/repair.js'
	import request from '../../service/request.js'
	import List from './list.vue'
	
	export default {
		components: {
			TabbarPage,
			Tabs,
			Search,
			RepairCard,
			List
		},
		mixins: [pageScrollMixin],
		data: () => ({
			repairType: [
				{
					code: 2,
					label: '待处理',
					key: 'pending'
				}, {
					code: 3,
					label: '进行中',
					key: 'doing'
				}, {
					code: 4,
					label: '已完成',
					key: 'finish'
				}, {
					code: 0,
					label: '全部',
					key: 'all'
				}
			],
			dataSource: {
				pending: [],
				doing: [],
				finish: [],
				all: []
			},
			overflowStyle: ''
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
			getList(code) {
				if(code === 3) return this.dataSource
				else return this.dataSource.filter(i => i.code === code)
			},
			handleLinkDetail(id) {
				uni.navigateTo({
					url: '/pages/repairDetail/repairDetail?id=' + id
				})
			}
		},
		onLoad: async function() {
			var option = {page: 1, limit: 100}
			var url = '/maint/fault_order'
			var res = await Promise.all([
				request.post(url, {...option, type: 2}),
				request.post(url, {...option, type: 3}),
				request.post(url, {...option, type: 4}),
				request.post(url, {...option, type: 0})
			])
			this.dataSource = {
				pending: item[0],
				doing: item[2],
				finish: item[3],
				all: item[4]
			}
		}
	}
</script>

<style scoped>
/* 	.page-list-container{
		padding-top: 1px;
		background-color: #F9F9F9;
	} */
	.swiper-item{
		padding-top: 1px;
		background-color: #F9F9F9;
	}
	.list-container{
		height: 100%;
		margin-top: 20rpx;
		padding: 1rpx 0 30rpx 0;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
</style>