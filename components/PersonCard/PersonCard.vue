<template>
	<view class="container">
		<view class="avatar">
			<image class="avatar-image" :src="'http://'+user.head_img" mode="aspectFill" />
		</view>
		<view class="realname" @click="handleLinkEditInfo">
			<text>{{user.realname}}</text>
			<image v-if="allowEidt" class="edit-icon" src="../../static/icon/mine/edit.png" />
		</view>
		<view class="detail">
			<text>{{jobs}}</text>
			<text class="line"></text>
			<text>{{sex}}</text>
			<text class="line"></text>
			<text>{{user.phone}}</text>
		</view>
		<view class="email">
			<text>{{user.email}}</text>
			<text style="margin-left: 20rpx">{{user.company_name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			allowEidt: {
				type: Boolean,
				default: false
			},
			user: {
				type: Object,
				default: () => ({
					realname: '真实姓名',
					jobs: 3,
					sex: 0,
					phone: "",
					email: "",
					company_name: ""
				})
			}
		},
		data: () => ({
			alias: {
				jobs: ['', '作用人员', '管理人员', '普通人员'],
				sex: ['保密', '男', '女']
			}
		}),
		computed: {
			jobs() {
				return typeof this.user.jobs === 'number' ? this.alias.jobs[this.user.jobs] : this.user.jobs
			},
			sex() {
				return typeof this.user.sex === 'number' ? this.alias.sex[this.user.sex] : this.user.sex
			}
		},
		methods: {
			handleLinkEditInfo() {
				uni.navigateTo({
					url: '/pages/editInfo/editInfo'
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 457rpx;
		padding-top: 50rpx;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, 0.05);
	}
	
	.avatar{
		width: 178rpx;
		height: 178rpx;
		margin: 0 auto;
		margin-bottom: 50rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.avatar-image{
		width: 100%;
		height: 100%;
	}
	
	.realname{
		margin-bottom: 20rpx;
		color: #000000;
		font-size: 31rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.edit-icon{
		width: 30rpx;
		height: 30rpx;
		margin-left: 32rpx;
	}
	
	.detail{
		margin-bottom: 10rpx;
		text-align: center;
		color: #000000;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.line{
		margin: 0 10px;
		width: 0.6px;
		height: 20rpx;
		background-color: #000000;
		display: inline-block;
	}
	
	.email{
		text-align: center;
		color: #000000;
		font-size: 23rpx;
	}
</style>
