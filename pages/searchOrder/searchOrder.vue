<template>
	<view class="container">
		<Search @search="handleSearch" :placeholder="searchPlaceholder" allowClear paddingBottom />
		<RepairCard
			v-for="record in dataSource"
			:key="record.id"
			:record="record"
			:type="mode"
			hasButton
			@click="handleLinkDetail($event, record.id)"
		/>
	</view>
</template>

<script>
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import request from '../../service/request'
	
	export default {
		components: {
			Search,
			RepairCard
		},
		data: () => ({
			// enum: ['maint', 'repair']
			mode: 'maint',
			dataSource: []
		}),
		computed: {
			searchPlaceholder() {
				return this.mode == 'maint' ? '搜索维保工单' : '搜索急修工单'
			}
		},
		methods: {
			// 搜索框完成输入
			handleSearch: async function(value) {
				var url = this.mode == 'maint' ? '/maint/main_order' : '/maint/fault_order'
				var res = await request.post(url, {
					type: 0,
					limit: 1000,
					page: 1,
					search: value
				})
				this.dataSource = res.data
			}
		},
		onLoad(option) {
			this.mode = option.mode
			var _this_ = this
			uni.setNavigationBarTitle({
				title: _this_.searchPlaceholder
			})
		}
	}
</script>

<style scoped>
</style>

