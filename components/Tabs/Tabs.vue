<template>
	<view class="container">
		<view
			v-for="(item, index) in tabs"
			:key="item"
			:class="'tab-item ' + (active === index ? 'active' : '')"
			@click="$emit('switch', index)"
		>
			<text>{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			active: {
				type: Number,
				default: 0
			},
			tabs: Array
		},
		methods: {
			handleSwitchTab(index) {
				this.$emit('switch', index)
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
	}
	.tab-item{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #000000;
		box-sizing: border-box;
		border-bottom: solid 1.5px transparent;
		transition: all 0.2s;
	}
	.active{
		color: #4190F5;
		border-bottom: solid 1.5px #4190F5;
	}
</style>
