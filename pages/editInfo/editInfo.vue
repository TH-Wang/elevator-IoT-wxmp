<template>
	<view class="container">
			<!-- 头像 -->
			<view class="avatar">
				<image
					class="avatar-image"
					:src="'http://' + info.head_img"
					@click="handlePreviewHeadImage"
					mode="aspectFill"
				/>
				<view class="avatar-button" @click="handleChooseImage">
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
					<input class="input" type="number" v-model="phone" placeholder="请输入"/>
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
	import request from '../../service/request.js'
	
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
			// 提交
			handleSubmit: async function() {
				var _this_ = this
				var data = {
					realname: _this_.realname,
					sex: Number(_this_.sex),
					phone: _this_.phone,
					email: _this_.email
				}
				var res = await request.post('/user_info/up_user', data)
				if(res.code == 1) {
					this.$store.commit('setUserInfo', {
						..._this_.info,
						...data
					})
					uni.showToast({
						icon: 'success',
						title: '修改成功',
						mask: true
					})
				} else {
					uni.showModal({
						title: '修改失败，请稍后再试',
						showCancel: false
					})
				}
			},
			// 预览头像
			handlePreviewHeadImage() {
				var url = 'http://' + this.info.head_img
				uni.previewImage({
					urls: [url]
				})
			},
			// 选择头像
			handleChooseImage() {
				var _this_ = this
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					success: function(res) {
						_this_.handleUpdateAvatar(res)
					}
				})
			},
			// 修改头像
			handleUpdateAvatar(res) {
				var _this_ = this
				var avatar = res.tempFilePaths[0]
				uni.uploadFile({
					url: `${_this_.$store.state.request.url}/api/user_info/up_head`,
					filePath: avatar,
					name: 'head_img',
					header: {
						"token": uni.getStorageSync('token'),
						"Content-Type": "multipart/form-data"
					},
					success: function(res) {
						var result = JSON.parse(res.data)
						console.log(result)
						if(result.code == 1) {
							uni.showToast({
								title: '修改成功',
								icon: 'success'
							})
							_this_.$store.commit('setUserInfo', {
								..._this_.info,
								head_img: result.data.image
							})
						}
					}
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
