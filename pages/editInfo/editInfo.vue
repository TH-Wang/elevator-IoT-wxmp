<template>
	<view class="container">
		<NavHeader title="编辑资料" />
		
		<scroll-view :scroll-y="true" class="main" :style="height">
			<!-- 头像 -->
			<view class="avatar">
				<image class="avatar-image" src="../../static/image/avatar.png" />
				<view class="avatar-button">
					<view class="avatar-text">选择头像</view>
					<image class="avatar-right-icon" src="../../static/icon/right.png" />
				</view>
			</view>
			
			<!-- 表单主体 -->
			<view class="form-container">
				<FormItem label="登录账号" >
					<text class="disable-text">zhoulixia@zhiyicx.com</text>
				</FormItem>
				<FormItem label="通道号" >
					<input class="input" type="text" value="" placeholder="请输入..."/>
				</FormItem>
				<FormItem label="职位" >
					<text class="disable-text">维保员</text>
				</FormItem>
				<FormItem label="姓名" >
					<input class="input" type="text" value="" placeholder="请输入..."/>
				</FormItem>
				<FormItem label="性别" >
					<input class="input" type="text" value="" placeholder="请输入..."/>
				</FormItem>
				<FormItem label="电话" >
					<input class="input" type="text" value="" placeholder="请输入..."/>
				</FormItem>
				<FormItem label="邮箱" >
					<input class="input" type="text" value="" placeholder="请输入..."/>
				</FormItem>
			</view>
			
			<!-- 提交按钮 -->
			<CommonButton text="保存资料" @click="handleSubmit" />
		</scroll-view>
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import FormItem from '../../components/FormItem/FormItem.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	
	export default {
		components: {
			NavHeader,
			FormItem,
			CommonButton
		},
		computed: {
			height() {
				return this.$store.getters.commonHeight
			}
		},
		methods: {
			handleSubmit() {
				console.log('保存资料')
			}
		}
	}
</script>

<style scoped>
	.main{
		background-color: #F9F9F9;
	}
	.avatar{
		width: 100%;
		height: 160rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
	}
	.avatar-image{
		width: 100rpx;
		height: 100rpx;
	}
	.avatar-button{
		display: flex;
		align-items: center;
		justify-content: right;
	}
	.avatar-text{
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #666666;
	}
	.avatar-right-icon{
		width: 22rpx;
		height: 22rpx;
	}
	
	.form-container{
		font-size: 24rpx;
		color: #000000;
	}
	.disable-text{
		color: #999999;
	}
	.input{
		flex: 1;
		text-align: right;
	}
</style>
