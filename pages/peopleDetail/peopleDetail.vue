<template>
	<view class="">
		<NavHeader title="山川皆无恙" />
		
		<scroll-view
			class="hidden-scroll"
			:style="height"
			:scroll-y="true"
			:show-scrollbar="false"
			upper-threshold="5"
			lower-threshold="5"
			@scrolltoupper="handleScrollToUpper"
			@scrolltolower="handleScrollToLower"
		>
			<PersonCard />
			
			<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" />
			
			<swiper
				:current="active"
				:duration="300"
				:style="mainheight"
				@change="handleSwiperChange"
			>
				<swiper-item v-for="(tab, index) in tabs" :key="index">
					<scroll-view class="list-container" :scroll-y="listScroll">
						<view v-for="item in dataSource" :key="item.id">
							<RepairCard :record="item" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			
		</scroll-view>
		
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import PersonCard from '../../components/PersonCard/PersonCard.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import repairData from '../../data/repair.js'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	
	export default {
		components: {
			NavHeader,
			PersonCard,
			Tabs,
			RepairCard
		},
		mixins: [pageScrollMixin],
		data: () => ({
			tabs: ['维保工单', '急修工单', '上报故障'],
			dataSource: repairData,
			// record
		}),
		methods: {
			handleTabsSwitch(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			}
		},
		onLoad(option) {
			// var detail = JSON.parse(decodeURIComponent(option.d));
			// this.record = detail
		}
	}
</script>

<style scoped>
	/* 隐藏滚动条 */
	scroll-view::-webkit-scrollbar{
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
