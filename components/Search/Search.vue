<template>
	<view class="container" :style="paddingBottom ? 'padding-bottom: 30rpx' : ''">
		<view class="search-box" @click="$emit('click-button')">
			
			<!-- 左侧主要部分 -->
			<view class="left">
				<image class="icon" src="../../static/icon/search.png" />
				
				<view v-if="button" class="button-input">
					{{placeholder}}
				</view>
				<input
					v-else
					class="input"
					type="text"
					v-model="value"
					:placeholder="placeholder"
					@input="handleInput"
				/>
			</view>
			
			<!-- 清除按钮 -->
			<view
				v-if="allowClear && canClear"
				class="clear-button"
				@click="handleClearValue"
			>
				<image class="clear-icon" src="../../static/icon/clear.png" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '请输入你想搜索的内容'
			},
			allowClear: {
				type: Boolean,
				default: true
			},
			button: {
				type: Boolean,
				default: false
			},
			paddingBottom: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			value: ''
		}),
		computed: {
			canClear() {
				return this.value !== ''
			}
		},
		methods: {
			handleInput(e) {
				this.$emit('change', value)
			},
			handleClearValue() {
				this.value = ''
				this.$emit('change', value)
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 70rpx;
		padding-top: 30rpx;
		background-color: #FFFFFF;
	}
	.search-box{
		margin: 0 auto;
		width: 690rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
	}
	
	.left{
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.icon{
		width: 36rpx;
		height: 36rpx;
		margin: 0 20rpx 0 30rpx;
	}
	.input{
		flex: 1;
		font-size: 24rpx;
	}
	.button-input{
		flex: 1;
		font-size: 24rpx;
		color: #AAAAAA;
	}
	
	.clear-button{
		padding: 0 25rpx 0 20rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
	}
	
	.clear-icon{
		width: 28rpx;
		height: 28rpx;
	}
</style>
