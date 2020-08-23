<template>
	<view class="container">
		<Tabs
			:tabs="tabs"
			:active="active"
			@switch="handleSwitchTab"
		/>
		
		<view class="main">
			<view class="swiper-container" :style="transform">
				
				<view class="main-item">
					<Report @success="active = 1" />
				</view>
				
				<view class="main-item">
					<History :active="active == 1" />
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
		height: calc(100vh - 100rpx);
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
		height: 100%;
		overflow-y: scroll;
		display: inline-block;
		font-size: 32rpx;
		vertical-align: top;
	}
</style>
