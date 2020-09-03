<template>
	<view class="">
		
		<scroll-view
			class="hidden-scroll"
			style="height: 100vh;"
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
				:current="active"
				:duration="300"
				style="height: calc(100vh - 100rpx);"
				@change="handleSwiperChange"
			>
				<swiper-item>
					<!-- 维保 -->
					<scroll-view class="list-container" :scroll-y="listScroll">
						<view v-for="maint in maintList" :key="maint.id">
							<RepairCard :record="maint" type="maint" detailAddress />
						</view>
						<view style="height: 30rpx" />
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<!-- 急修 -->
					<scroll-view class="list-container" :scroll-y="listScroll">
						<view v-for="repair in repairList" :key="repair.repair_id">
							<RepairCard :record="repair" type="repair" detailAddress />
						</view>
						<view style="height: 30rpx" />
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<!-- 上报 -->
					<scroll-view class="list-container" :scroll-y="listScroll">
						<view v-for="(report, index) in reportList" :key="index">
							<ReportCard :record="report" />
						</view>
						<view style="height: 30rpx" />
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
	import ReportCard from '../../components/ReportCard/ReportCard.vue'
	import pageScrollMixin from '../../mixin/pageScroll.js'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Tabs,
			PersonCard,
			RepairCard,
			ReportCard
		},
		mixins: [pageScrollMixin],
		data: () => ({
			tabs: ['维保工单', '急修工单', '上报故障'],
			dataSource: {},
			maintList: {},
			repairList: {},
			reportList: {}
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
			var options = {
				limit: 100,
				page: 1,
				user_id: id
			}
			var res = await Promise.all([
				request.post('/users/one_info', {id}),
				request.post('/users/user_maint', options),
				request.post('/users/user_repair', options),
				request.post('/users/user_repair_push', options)
			])
			console.log(res)
			this.dataSource = res[0].data
			this.maintList = res[1].data
			this.repairList = res[2].data
			this.reportList = res[3].data
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
	.list-container{
		padding: 1px 0 30rpx 0;
		background-color: #FFFFFF;
	}
</style>
