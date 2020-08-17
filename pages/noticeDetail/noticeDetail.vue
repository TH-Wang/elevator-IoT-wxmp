<template>
	<view>
		<NavHeader title="桥通目前已拥有成熟稳定的物联网方案框架" />
		
		<view class="main" :style="height">
			
			<view class="header">
				<view class="title ellipsis-twolines">
					{{dataSource.title}}
				</view>
				<view class="time">
					{{dataSource.time}}
				</view>
			</view>
			
			<view class="content">
				<text class="p">
					{{dataSource.content}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	
	export default {
		components: {
			NavHeader
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		},
		data: () => ({
			dataSource: null
		}),
		onLoad(option) {
			var detail = JSON.parse(decodeURIComponent(option.d));
			this.dataSource = detail
		}
	}
</script>

<style scoped>
	/* 两行省略号 */
	.ellipsis-twolines{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.main{
		padding: 1rpx 30rpx 30rpx 30rpx;
		background-color: #FFFFFF;
	}
	
	.header{
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 3px;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, .1);
	}
	
	.title{
		font-size: 28rpx;
		color: #000000;
		margin-bottom: 21rpx;
	}
	
	.time{
		font-size: 24rpx;
		color: #999999;	
	}
	
	.content{
		font-size: 24rpx;
		color: #000000;
	}
	.content .p{
		display: block;
		padding-top: 40rpx;
	}
</style>
