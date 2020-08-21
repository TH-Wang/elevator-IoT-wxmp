<template>
	<!-- <TabbarPage :header="{title: '我的', hasBack: false}" :tabbar="{active: 3}"> -->
		<scroll-view :scroll-y="true" class="main">
			<!-- 用户信息卡片 -->
			<PersonCard allowEidt :user="user" />
			
			<!-- 功能列表 -->
			<view class="list-container">
				<view
					class="list-item"
					v-for="(item, index) in list"
					:key="index"
					:style="item.space ? 'margin-top:20rpx' : ''"
					@click="handleLink(item.path)"
				>
					<view class="list-item-box">
						<view class="icon-box">
							<image class="icon-image" :src="item.iconImage" />
						</view>
						<text class="text">{{item.label}}</text>
						<image class="arrow-right" src="../../static/icon/right.png" />
					</view>
				</view>
				
				<!-- 退出登录按钮 -->
				<CommonButton
					class="singout-button"
					text="退出登录"
					@click="handleClickSingOutBtn"
				/>
			</view>
		</scroll-view>
	<!-- </TabbarPage> -->
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import PersonCard from '../../components/PersonCard/PersonCard.vue'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import listConfig from './listConfig.js'
	
	export default {
		components: {
			TabbarPage,
			PersonCard,
			CommonButton
		},
		data: () => ({
			list: listConfig
		}),
		computed: {
			user() {
				return this.$store.state.user.info
			},
			height() {
				return this.$store.getters.tabbarHeight
			}
		},
		methods: {
			handleClickSingOutBtn() {
				console.log('退出登录')
			},
			handleLink(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped>	
	.list-container{
		height: auto;
		background-color: #F9F9F9;
		padding-bottom: 1px;
	}
	.list-item{
		height: 100rpx;
		background-color: #FFFFFF;
	}
	
	.list-item-box{
		height: 100%;
		margin: 0 32rpx;
		padding: 6rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: solid 1px #F9F9F9;
	}
	
	.icon-box{
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		margin-right: 32rpx;
	}
	.icon-image{
		width: 32rpx;
		height: 32rpx;
	}
	
	.text{
		color: #2E2E2E;
		font-size: 28rpx;
	}
	.arrow-right{
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		right: 0rpx;
	}
</style>

