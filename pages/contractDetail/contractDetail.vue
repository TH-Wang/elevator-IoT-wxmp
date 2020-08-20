<template>
	<view class="container">
		<NavHeader title="绿色空间1号梯" />
		
		<scroll-view :scroll-y="true" class="main" :style="height">
			
			<view class="list-container">
				<Title title="合同信息" />
				
				<view class="item">
					<text>合同编号</text>
					<text>{{dataSource.unmber}}</text>
				</view>
				<view class="item">
					<text>合同金额</text>
					<text class="price">￥{{dataSource.money}}</text>
				</view>
				<view class="item">
					<text>合同状态</text>
					<text>进行中</text>
				</view>
				<view class="item">
					<text>签署时间</text>
					<text>{{dataSource.collection_time}}</text>
				</view>
				<view class="item">
					<text>合同期限</text>
					<text>{{dataSource.start_time}} - {{dataSource.end_time}}</text>
				</view>
				
				
				<view class="item space-item">
					<text>物业单位</text>
					<text>{{dataSource.real_company}}</text>
				</view>
				<view class="item">
					<text>维保单位</text>
					<text>{{dataSource.maint_company}}</text>
				</view>
				<view class="item">
					<text>联系人</text>
					<text>{{dataSource.linkman}}</text>
				</view>
				<view class="item">
					<text>联系电话</text>
					<text>{{dataSource.phone}}</text>
				</view>
			</view>
			
			<view class="file-container">
				<Title title="附件" />
				
				<view class="file-item">
					<image class="file-icon" :src="'../../static/icon/file/'+ filetype + '.png'" />
					<view class="file-info">
						<text class="file-name">这里是上传的文件名字但是噶</text>
						<text class="file-type">{{filetype.toUpperCase()}} 文档</text>
					</view>
					<view class="file-size">15.3M</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Title from '../../components/Title/Title.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Title
		},
		data: () => ({
			dataSource: {}
		}),
		computed: {
			height() {
				return this.$store.getters.commonHeight
			},
			filetype() {
				return this.dataSource.accessory.split('.').slice(-1)[0]
			}
		},
		onLoad: async function(option) {
			var { id } = option
			var res = request.post('/contracts/con_info', {id})
			this.dataSource = res.data
		}
	}
	
</script>

<style scoped>
	.main{
		background-color: #F9F9F9;
	}
	.list-container, .file-container{
		height: auto;
		background-color: #FFFFFF;
	}
	.file-container{
		margin-top: 20rpx;
	}
	.item{
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #000000;
	}
	.space-item{
		margin-top: 50rpx;
	}
	
	.file-item{
		width: 690rpx;
		height: 120rpx;
		padding: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border: solid 1px #F9F9F9;
		border-radius: 10rpx;
	}
	
	.file-icon{
		width: 60rpx;
		height: 60rpx;
		margin-right: 26rpx;
	}
	.file-info{
		height: 70rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.file-name{
		font-size: 28rpx;
		color: #000000;
	}
	.file-type{
		font-size: 22rpx;
		color: #999999;
	}
	.file-size{
		margin-left: 26rpx;
		font-size: 24rpx;
		color: #999999;
	}
</style>
