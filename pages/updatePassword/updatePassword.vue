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
					<input class="input" type="password" v-model="oldPs" placeholder="请输入"/>
				</FormItem>
				<FormItem label="请输入新密码" >
					<input class="input" type="password" v-model="newPs" placeholder="请输入"/>
				</FormItem>
				<FormItem label="请确认新密码" >
					<input class="input" type="password" v-model="rePs" @blur="handleValidate" placeholder="请输入"/>
				</FormItem>
			</view>
			
			<!-- 提交按钮 -->
			<CommonButton text="确认修改" @click="handleSubmit" />
			
			<!-- 反馈 -->
			<Feedback
				:visible="feedback.visible"
				:title="feedback.title"
				:mode="feedback.mode"
				:tip="feedback.tip"
				@close="feedback.visible = false"
			/>
			
	</view>
</template>

<script>
	import NavHeader from '../../components/NavHeader/NavHeader.vue'
	import FormItem from '../../components/FormItem/FormItem.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import Feedback from '../../components/Feedback/Feedback.vue'
	import request from '../../service/request.js'
	import md5 from 'md5'
	
	export default {
		components: {
			NavHeader,
			FormItem,
			CommonButton,
			Feedback
		},
		data: () => ({
			feedback: {
				visible: false,
				title: '',
				mode: '',
				tip: ''
			},
			oldPs: '',
			newPs: '',
			rePs: ''
		}),
		computed: {
			info() {
				return this.$store.state.user.info
			}
		},
		methods: {
			// 校验两次密码是否输入一致
			handleValidate() {
				if(this.newPs !== this.rePs) {
					uni.showModal({
						showCancel: false,
						title: '两次密码输入不一致'
					})
				}
			},
			async handleSubmit() {
				var _this_ = this
				// 1. 校验
				this.handleValidate()
				// 2. 验证旧密码
				var res = await request.post('/user_info/val_password', {
					password: md5(_this_.oldPs)
				})
				if(res.code != 1){
					uni.showModal({
						showCancel: false,
						title: '旧密码不正确，请重新输入'
					})
					return
				}
				// 3. 原密码与新密码是否相同
				if(this.oldPs === this.newPs) {
					uni.showModal({
						showCancel: false,
						title: '新密码不能与原密码相同!'
					})
					return
				}
				// 4. 修改新密码
				this.feedback = {
					visible: true,
					title: '修改中',
					mode: 'loading',
					tip: '正在修改...'
				}
				var resUpdate = await request.post('/user_info/up_password', {
					password: md5(_this_.newPs)
				})
				if(res.code == 1) {
					this.feedback = {
						visible: true,
						title: '修改成功',
						mode: 'success',
						tip: '恭喜您，密码重置成功!'
					}
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}, 1000)
				} else {
					this.feedback = {
						visible: true,
						title: '修改失败',
						mode: 'error',
						tip: '很遗憾，密码重置失败请重试!'
					}
				}
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
