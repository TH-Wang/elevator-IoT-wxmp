<template>
	<view class="container">
		<NavHeader title="故障上报" />
		
		<Tabs
			:tabs="tabs"
			:active="active"
			@switch="handleSwitchTab"
		/>
		
		<view class="main" :style="height">
			<view class="swiper-container" :style="transform">
				
				<view class="main-item">
					<Report />
				</view>
				
				<view class="main-item">
					<History />
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Report from './report.vue'
	import History from './history.vue'
	
	export default {
		components: {
			NavHeader,
			Tabs,
			Report,
			History
		},
		data: () => ({
			tabs: ['故障上报', '历史记录'],
			active: 0
		}),
		computed: {
			height() {
				return this.$store.getters.hasSearchHeight
			},
			transform() {
				return 'transform: translateX(' + (this.active * -100) + 'vw)'
			}
		},
		methods: {
			handleSwitchTab(idx) {
				this.active = idx
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
		background-color: #F9F9F9;
	}
	
	.main{
		width: 100vw;
	}
	
	.swiper-container{
		width: 200vw;
		height: 100%;
		overflow: hidden;
		font-size: 0;
		white-space: nowrap;
		transition: all 0.3s;
	}
	
	.main-item{
		width: 100vw;
		display: inline-block;
		font-size: 32rpx;
		vertical-align: top;
	}
</style>
