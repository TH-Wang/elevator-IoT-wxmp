<template>
	<TabbarPage :header="{title: '急修', hasBack: false}" :tabbar="{active: 2}">
		<scroll-view
			:style="height"
			class="container"
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
			<view
				class="swiper"
				@change="handleSwiperChange"
			>
				<view class="swiper-container" :style="translate">
					<view class="swiper-item" v-for="item in repairType" :key="item.code">
						<List :dataSource="getList(item.code)" />
					</view>
				</view>
			</view>
		</scroll-view>
	</TabbarPage>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import List from './list.vue'
	import contractData from '../../data/contract.js'
	
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
				return this.$store.getters.tabbarHeight
			},
			translate() {
				return 'transform: translateX(' + (this.active * -100) + 'vw)'
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
			},
			handleScroll(e) {
				console.log('scroll')
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/page.css");
	.container{
		overflow: scroll;
	}
	.swiper{
		width: 100%;
		font-size: 0;
	}
	.swiper-container{
		white-space: nowrap;
		font-size: 32rpx;
		transition: all 0.3s;
	}
	.swiper-item{
		float: left;
		width: 100vw;
		padding: 30rpx;
		background-color: #F9F9F9;
		box-sizing: border-box;
	}
</style>
