<template>
	<view class="container" >
		<view class="list-container">
			<ReportCard
				v-for="record in dataSource"
				:key="record.fault_start_time"
				:record="record"
			/>
		</view>
	</view>
</template>

<script>
	import ReportCard from '../../components/ReportCard/ReportCard.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			ReportCard
		},
		props: {
			active: Boolean
		},
		data: () => ({
			dataSource: []
		}),
		computed: {
			height() {
				return this.$store.getters.hasSearchHeight
			}
		},
		watch: {
			active: async function(newValue, oldValue) {
				if(newValue){
					var res = await request.post('/maint/fault_report_list')
					this.dataSource = res.data.reverse()
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		background-color: #F9F9F9;
		overflow-y: scroll;
	}
	.list-container{
		padding: 1px 0 30rpx 0;
		background-color: #FFFFFF;
	}
</style>
