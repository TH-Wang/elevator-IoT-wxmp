<template>
	<view class="container">
		<view
			v-for="(item, index) in tabs"
			:key="item"
			:class="'tab-item ' + activeClass(index)"
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
			tabs: Array,
			// 枚举： ['equally', 'short'] --- equally: 平分、 short: 短
			borderType: {
				type: String,
				default: 'equally'
			}
		},
		computed: {
		},
		methods: {
			handleSwitchTab(index) {
				this.$emit('switch', index)
			},
			activeClass(index) {
				return this.active === index ? 'active-' + this.borderType : ''
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		position: sticky;
		top: 0;
		z-index: 100;
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
		position: relative;
	}
	.active-equally{
		color: #4190F5;
		border-bottom: solid 1.5px #4190F5;
	}
	.active-short{
		color: #4190F5;
	}
	.active-short::after{
		content: '';
		display: block;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		width: 30rpx;
		height: 3px;
		border-radius: 3px;
		background-color: #4190F5;
		z-index: 100;
	}
</style>
