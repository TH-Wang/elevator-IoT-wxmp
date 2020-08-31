<template>
	<view class="container">
		
		<view class="background">
			<image class="background-image" src="../../static/image/login-background.png" mode=""></image>
		</view>
		
		<view class="logo-card">
			<image src="../../static/image/logo.png" mode=""></image>
		</view>
		
		<view class="title">账号绑定</view>
		
		<!-- 关注微信公众号弹窗 -->
		<official-account></official-account>
		
		<view style="margin-top: 20rpx;">
			<IconInput
				iconImage="../../static/icon/login/code.png"
				:tip="errTip.channel_number"
			>
				<input
					type="text"
					v-model="form.channel_number"
					@blur="validateCNumber"
					placeholder="通道号"
				/>
			</IconInput>
		</view>
		
		<IconInput
			iconImage="../../static/icon/login/tel.png"
			:tip="errTip.name"
		>
			<input
				type="text"
				v-model="form.name"
				placeholder="请输入账号"
			/>
		</IconInput>
		
		<IconInput
			iconImage="../../static/icon/login/password.png"
			:tip="errTip.password"
		>
			<input
				type="password"
				v-model="form.password"
				placeholder="请输入密码"
			/>
		</IconInput>
		
		<view class="bottom-button" @click="handleCheck">
			<!-- 选中 -->
			<view v-if="checked" class="remember-password-button">
				<image class="remember-password-icon" src="../../static/icon/login/checked.png" mode />
				<text class="remember-password-text" style="color: #4190F5">记住密码</text>
			</view>
			<!-- 未选中 -->
			<view v-else class="remember-password-button">
				<image class="remember-password-icon" src="../../static/icon/login/unchecked.png" mode />
				<text class="remember-password-text">记住密码</text>
			</view>
			<view class="forget-password-button" @click="handleLinkFindPass">
				忘记密码？
			</view>
		</view>
		
		<button type="primary" class="submit-button" @click="handleBind">绑定</button>
		
		<view class="scan-button">
			<image src="../../static/icon/login/scan.png" mode=""></image>
		</view>
		<view class="scan-text">
			扫一扫，了解电梯详情
		</view>
		
		<!-- 反馈 -->
		<Feedback
			:visible="feedback.visible"
			@close="feedback.visible = false"
			:title="feedback.title"
			:mode="feedback.mode"
			:tip="feedback.tip"
		/>
	</view>
</template>

<script>
	import md5 from 'md5'
	import IconInput from '../../components/IconInput/IconInput.vue'
	import Feedback from '../../components/Feedback/Feedback.vue'
	import request from '../../service/request.js'
	import rules from './rules.js'
	
	export default {
		components: {
			IconInput,
			Feedback
		},
		data: () => ({
			form: {
				channel_number: '',
				name: '',
				password: ''
			},
			success: {
				channel_number: false,
				name: false,
				password: false
			},
			errTip: {
				channel_number: '',
				name: '',
				password: ''
			},
			feedback: {
				visible: false,
				title: '',
				mode: '',
				tip: ''
			},
			checked: false
		}),
		methods: {
			handleCheck() {
				this.checked = !this.checked
			},
			handleLinkFindPass() {
				uni.navigateTo({
					url: '../findPass/findPass'
				})
			},
			async handleBind() {
				try{
					// 表单校验
					var result = await this.validateForm()
					// 验证失败则发送请求
					if(!result) return
					console.log(md5(this.form.password))
					
					// 反馈框: 加载
					this.feedback = {
						visible: true,
						title: '正在登录',
						mode: 'loading',
						tip: '拼命加载中...'
					}
					
					// 发送请求
					var res = await request.bind(this.form)
					console.log(res)
					
					if(res.code == -1) {
						this.feedback = {
							visible: false
						}
						uni.showModal({
							title: '请先关注“梯联宝”公众号',
							showCancel: false
						})
					}
					else if(res.code == 1){
						// 绑定成功
						this.handleBindSuccess(res)
					}
					else {
						this.feedback = {
							visible: true,
							title: '登录失败',
							mode: 'error',
							tip: res.msg
						}
					}
					
				}
				catch(err){
					if(err){
						// 反馈框: 失败
						this.feedback = {
							visible: true,
							title: '登录失败',
							mode: 'error',
							tip: err
						}
					}
					console.log(err)
				}
			},
			// 绑定成功操作
			handleBindSuccess(res) {
				// 反馈框: 成功
				this.feedback = {
					visible: true,
					title: '登录成功',
					mode: 'success',
					tip: '正在跳转首页'
				}
				
				// 保存用户信息
				this.$store.commit('setUserInfo', res.data)
				// 保存请求地址
				this.$store.commit('setBaseUrl', res.data.request_url)
				// 跳转到首页
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 300)
			},
			// 表单所有字段的验证
			validateForm() {
				return new Promise((resolve, reject) => {
					// 验证失败的数量
					var errCount = 0
					// 逐一校验
					if(!this.validateCNumber()) errCount++
					// if(!this.validateName()) errCount++
					// if(!this.validatePassword()) errCount++
					
					// 返回结果：是否全部通过验证
					resolve(errCount === 0)
				})
			},
			// 通道号验证
			validateCNumber() {
				if(rules.channel_number.rule.test(this.form.channel_number)){
					this.success.channel_number = true
					this.errTip.channel_number = ''
					return true
				}
				else {
					this.success.channel_number = false
					this.errTip.channel_number = rules.channel_number.msg
					return false
				}
			},
			// 用户名验证
			validateName() {
				if(rules.name.rule.test(this.form.name)){
					this.success.name = true
					this.errTip.name = ''
					return true
				}
				else {
					this.success.name = false
					this.errTip.name = rules.name.msg
					return false
				}
			},
			// 密码验证
			validatePassword() {
				// 长度不够
				if(!/^[\s\S]{6,18}$/.test(this.form.password)) {
					this.errTip.password = rules.password.msg
					this.success.name = false
					return false
				}
				// 安全级别
				else {
					var psdLevel = 0
					rules.password.rule.forEach(reg => {
						if(reg.test(this.form.password)) psdLevel++
					})
					if(psdLevel < 2) {
						this.success.password = false
						this.errTip.password = rules.password.msg
						return false
					}
					else {
						this.success.password = true
						this.errTip.password = ''
						return true
					}
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	input{
		flex: 1;
	}
	
	.background{
		width: 100%;
		height: 429rpx;
	}
	.background-image{
		width: 100%;
		height: 100%;
	}
		
	.logo-card{
		margin: 0 auto;
		width: 164rpx;
		height: 164rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		box-shadow: 1px 1px 21px rgba(0,136,255,0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translateY(-50%);
	}
	.logo-card image{
		width: 124rpx;
		height: 100rpx;
	}
	
	.title{
		width: 100%;
		text-align: center;
		margin: -20rpx 0 30rpx 0;
		font-size: 36rpx;
		color: #000000;
	}
	
	.bottom-button{
		width: 600rpx;
		margin: 0 auto;
		margin-top: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.remember-password-button{
		display: flex;
		align-items: center;
	}
	.remember-password-icon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 22rpx;
	}
	.remember-password-text{
		height: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}
	
	.forget-password-button{
		font-size: 24rpx;
		color: #4190F5;
	}
	
	.submit-button{
		width: 600rpx;
		height: 98rpx;
		margin-top: 60rpx;
		line-height: 98rpx;
		border-radius: 10px;
		font-size: 36rpx;
		text-align: center;
		background-color: #43A9FF;
	}
	
	.scan-button{
		width: 56rpx;
		height: 56rpx;
		margin: 0 auto;
		margin-top: 88rpx;
	}
	.scan-button image{
		width: 100%;
		height: 100%;
	}
	.scan-text{
		width: 100%;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		font-size: 24rpx;
		color: #666666;
	}
</style>
