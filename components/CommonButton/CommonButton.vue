<template>
	<view
		:class="viewClass"
		:style="margin ? 'margin: 80rpx auto 30rpx auto;' : ''"
		@click="handleClick"
	>
		{{text}}
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '常用按钮'
			},
			size: {
				type: String,
				default: 'default'
			},
			margin: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			viewClass() {
				return 'button' + ' button-' + this.size + (this.disabled ? ' disabled' : '')
			}
		},
		methods: {
			handleClick() {
				if(this.disabled) return
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.button{
		border-radius: 5px;
		text-align: center;
		background-color: #4190F5;
		color: #FFFFFF;
	}
	
	.button-default{
		width: 530rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	.button-small{
		width: 320rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 24rpx;
	}
	
	.disabled{
		background-color: #EEEEEE;
		color: #999999;
	}
</style>
