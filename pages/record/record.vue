<template>
	<view>
		<NavHeader title="档案资料" />
		
		<view class="grid">
			<view
				class="grid-item"
				v-for="item in gridConfig"
				:key="item.text"
				:style="'background-color:' + item.color"
				@click="handleLink(item.path)"
			>
				<image class="grid-item-image" :src="item.image" />
				<text class="grid-item-text">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import gridConfig from './gridConfig.js'
	
	export default {
		components: {
			NavHeader
		},
		data: () => ({
			gridConfig
		}),
		methods: {
			handleLink(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped>
	.grid{
		padding: 54rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.grid-item{
		width: 294rpx;
		height: 364rpx;
		margin-bottom: 54rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
	}
	.grid-item-image{
		margin-bottom: 38rpx;
		width: 142rpx;
		height: 142rpx;
	}
	.grid-item-text{
		font-size: 32rpx;
		color: #FFFFFF;
	}
</style>
