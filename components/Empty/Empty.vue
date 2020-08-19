<template>
	<view class="container">
		{{title}}
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '暂无数据'
			}
		},
		data: () => ({
			
		}),
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container{
		padding-top: 100px;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		color: #666666;
	}
</style>

