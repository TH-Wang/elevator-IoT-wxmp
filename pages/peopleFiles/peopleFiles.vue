<template>
	<view class="container">
		<!-- 搜索框 -->
		<Search paddingBottom @search="handleSearch" />
		
		<!-- 列表 -->
		<scroll-view :scroll-y="true" class="list-container">
			<view class="card-container">
				<view
					class="card"
					v-for="(item, index) in dataSource"
					:key="item.id"
					@click="handleLinkDetail(dataSource[index].user_id)"
				>	
					<view class="avatar-container">
						<image class="avatar" :src="'http://'+item.head_img" />
					</view>
					
					<view class="info">
						<view class="header">
							<text class="name">{{item.realname}}</text>
							<text class="identity">{{item.role}}</text>
						</view>
						<view class="tel" @longpress="handlePhoneCall(item.phone)">
							<image class="icon-small" src="../../static/icon/info/tel.png" />
							<text class="detail-info">{{item.phone}}</text>
						</view>
						<view class="email">
							<image class="icon-small" src="../../static/icon/info/email.png" />
							<text class="detail-info">{{item.email}}</text>
						</view>
					</view>
					
					<image class="icon-right" src="../../static/icon/right.png" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import Search from '../../components/Search/Search.vue'
	import peopleData from '../../data/people'
	import request from '../../service/request.js'
	
	export default {
		components: {
			NavHeader,
			Search
		},
		data: () => ({
			dataSource: []
		}),
		methods: {
			handleLinkDetail(id) {
				var url = '/pages/peopleDetail/peopleDetail?id=' + id
				uni.navigateTo({ url })
			},
			handleSearch: async function (value) {
				var res = await request.post('/users/lists', {vaill_name: value})
				this.dataSource = res.data
			},
			handlePhoneCall(phone) {
				uni.showActionSheet({
					itemList: ['复制手机号', '拨打号码'],
					success(res) {
						var { tapIndex } = res
						if(tapIndex === 1) {
							uni.makePhoneCall({
								phoneNumber: phone
							})
						}
					}
				})
			}
		},
		onLoad: async function() {
			var res = await request.post('/users/lists')
			console.log(res)
			this.dataSource = res.data
		}
	}
</script>

<style scoped>
	.container{
		height: 100vh;
	}
	
	.list-container{
		height: calc(100% - 130rpx);
		box-sizing: border-box;
		background-color: #F9F9F9;
	}
	
	.card-container{
		margin-top: 23rpx;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	.card{
		padding: 30rpx 0rpx;
		display: flex;
		align-items: center;
	}
	.card + .card{
		border-top: solid 1px #F9F9F9;
	}
	
	.avatar-container{
		width: 120rpx;
		height: 120rpx;
		margin-right: 30rpx;
		border-radius: 50%;
	}
	.avatar{
		width: 100%;
		height: 100%;
	}
	
	.info{
		height: 120rpx;
		flex: 1;
		/* display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between; */
	}
	
	.header, .tel, .email{
		height: 40rpx;
	}
	
	.tel:active{
		color: #999999;
	}
	
	.name{
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #000000;
	}
	.identity{
		font-size: 18rpx;
		color: #999999;
	}
	
	.icon-small{
		width: 18rpx;
		height: 18rpx;
		margin-right: 15rpx;
	}
	.detail-info{
		font-size: 21rpx;
		color: #666666;
	}
	
	.icon-right{
		width: 26rpx;
		height: 26rpx;
	}
</style>
