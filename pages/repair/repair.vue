<template>
	<view>
		<!-- 搜索框 -->
		<Search button placeholder="搜索急修工单" />
		
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
				<!-- 空数据 -->
				<Empty v-if="dataSource[item.key].length == 0" :title="'暂无' + item.label + '工单'" />
				<!-- 急修工单列表 -->
				<RepairCard
					v-for="record in dataSource[item.key]"
					:key="record.id"
					:record="record"
					hasButton
					type="repair"
					@click="handleLinkDetail($event, record.id)"
				/>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	import repairData from '../../data/repair.js'
	import request from '../../service/request.js'
	
	export default {
		components: {
			TabbarPage,
			Tabs,
			Search,
			RepairCard,
			Empty
		},
		mixins: [pageScrollMixin],
		data: () => ({
			repairType: [
				{
					code: 1,
					label: '待接警',
					key: 'wait'
				}, 
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
		}),
		computed: {
			tabs() {
				return this.repairType.map(i=>i.label)
			},
			dataSource() {
				return this.$store.state.repair.list
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
			handleLinkDetail(e, id) {
				uni.navigateTo({
					url: '/pages/repairDetail/repairDetail?id=' + id
				})
			},
			async handleRequestData() {
				var option = {page: 1, limit: 100}
				var url = '/maint/fault_order'
				var res = await Promise.all([
					request.post(url, {...option, type: 1}),
					request.post(url, {...option, type: 2}),
					request.post(url, {...option, type: 3}),
					request.post(url, {...option, type: 4}),
					request.post(url, {...option, type: 0})
				])
				console.log(res)
				this.dataSource = {
					wait: res[0].data,
					pending: res[1].data,
					doing: res[2].data,
					finish: res[3].data,
					all: res[4].data
				}
			}
		},
		// onShow: async function() {
		// 	await this.handleRequestData()
		// },		
		onLoad: async function() {
			await this.$store.dispatch('refreshRepair')
		},
		onPullDownRefresh: async function() {
			await this.$store.dispatch('refreshRepair')
			uni.stopPullDownRefresh()
		}
	}
</script>

<style scoped>
	.page-list-container{
		height: calc(100vh - 200rpx);
		padding-top: 1px;
		box-sizing: border-box;
	}
	.swiper-item{
		overflow-y: scroll;
		height: 100%;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
</style>