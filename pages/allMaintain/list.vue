<template>
	<view>
		<RepairCard
			v-for="item in dataSource"
			:key="item.id"
			:record="item"
			background="rgba(253, 144, 38, .05)"
		/>
	</view>
</template>

<script>
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	
	export default {
		components: {
			RepairCard
		},
		props: {
			dataSource: {
				type: Array,
				default: ()=>([])
			}
		}
	}
</script>
