<template>
	<view
		:class="viewClass"
		:style="margin ? 'margin: 80rpx auto 30rpx auto;' : ''"
		@click="$emit('click')"
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
			}
		},
		computed: {
			viewClass() {
				return 'button ' + 'button-' + this.size
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
</style>
