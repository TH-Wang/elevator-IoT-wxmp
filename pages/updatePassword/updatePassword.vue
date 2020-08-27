<template>
	<view class="container">
			<!-- 头部文本 -->
			<view class="header">
				<text>请为你的账号</text>
				<text class="acount-text">{{info.user_name}}</text>
				<text>修改密码</text>
			</view>
			
			<!-- 表单主体 -->
			<view class="form-container">
				<FormItem label="请输入旧密码" >
					<input class="input" type="password" value="" placeholder="请输入"/>
				</FormItem>
				<FormItem label="请输入新密码" >
					<input class="input" type="password" value="" placeholder="请输入"/>
				</FormItem>
				<FormItem label="请确认旧密码" >
					<input class="input" type="password" value="" placeholder="请输入"/>
				</FormItem>
			</view>
			
			<!-- 提交按钮 -->
			<CommonButton text="确认修改" @click="handleSubmit" />
			
			<!-- 反馈 -->
			<Feedback
				:visible="visible"
				@close="visible = false"
				title="正在提交"
				mode="loading"
				tip="为您拼命加载中..."
			/>
			
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import FormItem from '../../components/FormItem/FormItem.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import Feedback from '../../components/Feedback/Feedback.vue'
	
	export default {
		components: {
			NavHeader,
			FormItem,
			CommonButton,
			Feedback
		},
		data: () => ({
			visible: false
		}),
		computed: {
			info() {
				return this.$store.state.user.info
			}
		},
		methods: {
			handleSubmit() {
				this.visible = true
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color: #F9F9F9;
		height: 100vh;
		overflow-y: scroll;
	}
	.header{
		width: 100%;
		height: 160rpx;
		margin-bottom: 20rpx;
		line-height: 160rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		background-color: #FFFFFF;
		border-top: solid 1px #F9F9F9;
	}
	.acount-text{
		margin: 0 20rpx;
		color: #4190F5;
	}
	
	.input{
		flex: 1;
		font-size: 24rpx;
	}
</style>
