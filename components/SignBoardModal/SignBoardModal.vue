<template>
	<view>
		<transition name="fade">
			<!-- 背景 -->
			<view v-show="visible" class="back" id="back" @click="handleClose">
				
				<!-- 卡片主体 -->
				<view class="card-container">
					<!-- 关闭按钮 -->
					<image
						class="close-button"
						src="../../static/image/signin/close.png"
						@click="$emit('close')"
					/>
					<!-- 标题 -->
					<view class="title">{{title}}</view>
					<!-- 签字板 -->
					<SignBoard ref="sign" />
					<!-- 尾部 -->
					<view class="footer" :style="footerStyle">
						<!-- 取消按钮 -->
						<view class="button cancel-button" v-if="showCancel">
							取消
						</view>
						<!-- 确认按钮 -->
						<view class="button confirm-button" @click="handleSave">
							确认
						</view>
					</view>
				</view>
				
			</view>
		</transition>
	</view>
</template>

<script>
	import SignBoard from '../SignBoard/SignBoard.vue'
	
	export default {
		components: {
			SignBoard
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			showCancel: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '签字确认'
			}
		},
		computed: {
			footerStyle() {
				return 'justify-content:' + (this.showCancel ? 'space-between' : 'center')
			}
		},
		methods: {
			handleClose(e) {
				if(e.target.id == 'back') {
					this.$emit('close')
				}
			},
			async handleSave() {
				var filePath = await this.$refs.sign.finish()
				this.$emit('save', filePath)
			}
		}
	}
</script>

<style scoped>
	.back{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .5);
	}
	.card-container{
		width: 600rpx;
		padding: 0 30rpx 46rpx 30rpx;
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 8rpx;
		background-color: #FFFFFF;
	}
	.title{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 30rpx;
		color: #000000;
	}
	.close-button{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: -15rpx;
		right: -15rpx;
	}
	.footer{
		padding-top: 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.button{
		width: 300rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		text-align: center;
	}
	.cancel-button{
		margin-right: 20rpx;
		background-color: rgba(65, 144, 245, 0.2);
		color: #4190F5;
	}
	.confirm-button{
		background-color: #0088FF;
		color: #FFFFFF;
	}
</style>

