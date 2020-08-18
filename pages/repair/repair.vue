<template>
	<TabbarPage :header="{title: '急修', hasBack: false}" :tabbar="{active: 2}">
		<scroll-view
			:style="tabbarHeight"
			:scroll-y="true"
			:show-scrollbar="false"
			upper-threshold="5"
			lower-threshold="5"
			@scrolltoupper="handleScrollToUpper"
			@scrolltolower="handleScrollToLower"
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
					<scroll-view class="list-container" :scroll-y="listScroll">
						<List :dataSource="getList(item.code)" />
					</scroll-view>
				</swiper-item>
			</swiper>
		</scroll-view>
	</TabbarPage>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	import repairData from '../../data/repair.js'
	import List from './list.vue'
	
	export default {
		components: {
			TabbarPage,
			Tabs,
			Search,
			List
		},
		mixins: [pageScrollMixin],
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
			dataSource: repairData,
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