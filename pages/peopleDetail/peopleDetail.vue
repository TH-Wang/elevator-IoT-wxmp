<template>
	<view class="">
		
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
			<PersonCard :user="{
				realname: dataSource.realname,
				head_img: dataSource.head_img,
				jobs: dataSource.jobs,
				sex: dataSource.sex,
				phone: dataSource.phone,
				email: dataSource.email,
				company_name: dataSource.company_name
			}" />
			
			<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" />
			
			<swiper
				v-if="false"
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
	// import repairData from '../../data/repair.js'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	import request from '../../service/request.js'
	
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
			dataSource: {},
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
		onLoad: async function(option) {
			var { id } = option
			var res = await request.post('/users/one_info', { id })
			this.dataSource = res.data
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
