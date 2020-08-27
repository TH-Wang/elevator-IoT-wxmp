<template>
	<view class="container">
			<!-- 头像 -->
			<view class="avatar">
				<image class="avatar-image" :src="'http://' + info.head_img" />
				<view class="avatar-button">
					<view class="avatar-text">选择头像</view>
					<image class="avatar-right-icon" src="../../static/icon/right.png" />
				</view>
			</view>
			
			<!-- 表单主体 -->
			<view class="form-container">
				<FormItem label="登录账号" >
					<text class="disable-text">{{info.user_name}}</text>
				</FormItem>
				<FormItem label="通道号" >
					<text class="disable-text">{{info.channel_number}}</text>
				</FormItem>
				<FormItem label="职位" >
					<text class="disable-text">{{getJob()}}</text>
				</FormItem>
				<FormItem label="姓名" >
					<input class="input" type="text" v-model="realname" placeholder="请输入..."/>
				</FormItem>
				<FormItem label="性别" >
					<radio-group class="radio-group" @change="handleSexChange">
							<radio
								class="radio"
								color="#0088FF" 
								:value="1" 
								:checked="sex == 1" 
							/><text style="margin-right: 6rpx;">男</text>
							<radio
								class="radio"
								color="#0088FF" 
								:value="2" 
								:checked="sex == 2" 
							/><text>女</text>
					</radio-group>
				</FormItem>
				<FormItem label="电话" >
					<input class="input" type="text" v-model="phone" placeholder="请输入"/>
				</FormItem>
				<FormItem label="邮箱" >
					<input class="input" type="text" v-model="email" placeholder="请输入"/>
				</FormItem>
			</view>
			
			<!-- 提交按钮 -->
			<CommonButton text="保存资料" @click="handleSubmit" />
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
		data: () => ({
			realname: '',
			sex: '',
			phone: '',
			email: ''
		}),
		computed: {
			info() {
				return this.$store.state.user.info
			}
		},
		methods: {
			handleSexChange(e) {
				this.sex = e.detail.value
			},
			getJob() {
				switch(this.info.jobs) {
					case 1: return '作用人员';
					case 2: return '管理人员';
					case 3: return '普通人员';
					default: return '普通人员'
				}
			},
			handleSubmit() {
				var _this_ = this
				console.log('----保存资料----')
				console.log({
					realname: _this_.realname,
					sex: _this_.sex,
					phone: _this_.phone,
					email: _this_.email
				})
			}
		},
		onLoad() {
			this.realname = this.info.realname
			this.sex = this.info.sex
			this.phone = this.info.phone
			this.email = this.info.email
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
	
	.radio-group{
		display: flex;
		align-items: center;
	}
	.radio{
		transform: scale(0.7);
	}
</style>
