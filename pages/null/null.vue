<template>
	<view class="container">
		<NavHeader title="开发中" />
		
		<view class="main">
			正在努力开发中...
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	
	export default {
		components: {
			NavHeader
		},
	}
</script>

<style>
	.main{
		padding-top: 100px;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		color: #666666;
	}
</style>
