<template>
	<view>
		<ContractCard
			v-for="item in dataSource"
			:key="item.id"
			:record="item"
			background="rgba(253, 144, 38, .05)"
		/>
	</view>
</template>

<script>
	import ContractCard from '../../components/ContractCard/ContractCard.vue'
	
	export default {
		components: {
			ContractCard
		},
		props: {
			dataSource: {
				type: Array,
				default: ()=>([])
			}
		}
	}
</script>
