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
			tabbar: [
				{
					path: '/pages/index/index',
					icon: '../../static/icon/tabbar/home.png',
					activeIcon: '../../static/icon/tabbar/home-active.png',
					text: '首页'
				},{
					path: '/pages/maintain/maintain',
					icon: '../../static/icon/tabbar/maintain.png',
					activeIcon: '../../static/icon/tabbar/maintain-active.png',
					text: '保养'
				},{
					path: '/pages/repair/repair',
					icon: '../../static/icon/tabbar/repair.png',
					activeIcon: '../../static/icon/tabbar/repair-active.png',
					text: '急修'
				},{
					path: '/pages/mine/mine',
					icon: '../../static/icon/tabbar/mine.png',
					activeIcon: '../../static/icon/tabbar/mine-active.png',
					text: '我的'
				}
			]
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
