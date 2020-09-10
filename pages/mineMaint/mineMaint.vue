<template>
	<view class="container">		
		<!-- 空数据 -->
		<Empty v-if="dataSource.length == 0" :title="'暂无维保工单'" />
		<!-- 急修工单列表 -->
		<scroll-view
			class="list-container"
			scroll-y="true"
			:lower-threshold="120"
			@scrolltolower="handleScrollToLower"
		>
			<RepairCard
				v-for="record in dataSource"
				:key="record.id"
				:record="record"
				type="maint"
				@click="handleLinkDetail($event, record.id)"
			/>
		</scroll-view>
		
	</view>
</template>

<script>
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			Search,
			RepairCard,
			Empty
		},
		data: () => ({
			limit: 20,
			page: 1,
			dataSource: []
		}),
		methods: {
			requestList: async function () {
				if(this.dataSource.length % this.limit > 0) return
				var _this_ = this
				var res = await request.post('/users/user_maint', {
					limit: _this_.limit,
					page: _this_.page
				})
				if(res.code == 1) {
					this.dataSource.push(...res.data)
					this.page = this.page + 1
				}
			},
			handleScrollToLower: async function() {
				await this.requestList()
			},
			handleLinkDetail(e, id) {
				uni.navigateTo({
					url: '/pages/workdel/workdel?id=' + id
				})
			}
		},
		onLoad: async function() {
			await this.requestList()
		}
	}
</script>

<style scoped>
	.list-container{
		height: 100vh;
	}
</style>

