<template>
	<view>
			
			<view class="header">
				<view class="title ellipsis-twolines">
					{{dataSource.title}}
				</view>
				<view class="time">
					{{dataSource.add_time}}
				</view>
			</view>
			
			<view class="content">
					<rich-text :nodes="dataSource.content"></rich-text>
			</view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import request from '../../service/request.js'
	
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
			dataSource: {
				title: '',
				add_time: '',
				content: ''
			}
		}),
		onLoad: async function(option) {
			var { id } = option;
			var res = await request.post('/jobs/one_info', { id })
			if(res.data) this.dataSource = res.data
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
		padding-top: 30rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	
	.header{
		margin: 0 30rpx 30rpx 30rpx;
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
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #000000;
	}
	.content .p{
		display: block;
		padding-top: 40rpx;
	}
</style>
