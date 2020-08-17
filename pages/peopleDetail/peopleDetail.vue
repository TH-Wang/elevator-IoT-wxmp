<template>
	<view class="">
		<NavHeader title="山川皆无恙" />
		
		<view class="container" :style="height">
			
			<PersonCard />
			
			<Tabs :tabs="tabs" :active="active" @switch="handleTabsSwitch" />
			
			<view :style="mainheight">
				<view v-for="item in dataSource" :key="item.id">
					<RepairCard :record="item" />
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import PersonCard from '../../components/PersonCard/PersonCard.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import repairData from '../../data/repair.js'
	
	export default {
		components: {
			NavHeader,
			PersonCard,
			Tabs,
			RepairCard
		},
		data: () => ({
			active: 0,
			tabs: ['维保工单', '急修工单', '上报故障'],
			dataSource: repairData,
			// record
		}),
		computed: {
			height() {
				return this.$store.getters.commonHeight
			},
			mainheight() {
				return this.$store.getters.hasSearchHeight
			}
		},
		methods: {
			handleTabsSwitch(idx) {
				console.log(idx)
				this.active = idx
			}
		},
		onLoad(option) {
			// var detail = JSON.parse(decodeURIComponent(option.d));
			// this.record = detail
		}
	}
</script>

<style scoped>
	.container{
		overflow-y: scroll;
	}
</style>
