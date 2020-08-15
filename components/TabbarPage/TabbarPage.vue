<template>
	<view class="page">
		<NavHeader :title="header.title" :hasBack="header.hasBack" />
		<slot></slot>
		<Tabbar :active="tabbar.active" />
	</view>
</template>

<script>
	import NavHeader from '../NavHeader/NavHeader.vue'
	import Tabbar from '../Tabbar/Tabbar.vue'
	
	export default {
		components: {
			NavHeader,
			Tabbar
		},
		props: {
			header: {
				type: Object,
				default: () => ({
					title: '标题',
					hasBack: true
				})
			},
			tabbar: {
				type: Object,
				default: () => ({
					active: 0
				})
			}
		}
	}
</script>

<style>
</style>
