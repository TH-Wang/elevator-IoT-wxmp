<template>
	<view class="container">
		<view
			class="tabbar-item"
			v-for="(item, index) in tabbar"
			:key="index"
			@click="handleSwitchTab(item.path)"
		>
			<image
				class="icon"
				:src="active === index ? item.activeIcon : item.icon"
				mode
			/>
			<text
				class="text"
				:style="'color: ' + (active === index ? activeColor : color)"
			>
				{{item.text}}
			</text>
		</view>
	</view>
</template>

<script>
	import tabbarConfig from './tabbarConfig.js'
	
	export default {
		props: {
			active: {
				type: Number,
				default: 0
			}
		},
		data: () => ({
			color: '#000000',
			activeColor: '#4190F5',
			tabbar: tabbarConfig
		}),
		methods: {
			handleSwitchTab(path) {
				uni.reLaunch({
					url: path
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100rpx;
		border-top: solid 1px #F9F9F9;
		box-sizing: border-box;
		display: flex;
		background-color: #FFFFFF;
	}
	
	.tabbar-item{
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.icon{
		width: 36rpx;
		height: 36rpx;
		margin-bottom: 3px;
	}
	
	.text{
		font-size: 20rpx;
	}
</style>
