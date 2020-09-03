<template>
		<view class="container">
			<!-- banner -->
			<swiper
				class="swiper"
				:indicator-dots="true"
				indicator-color="rgba(255, 255, 255, .5)"
				indicator-active-color="#4190F5"
				:autoplay="true"
				:circular="true"
				:interval="5000"
				:duration="500"
			>
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<view class="swiper-item">
						<image class="swper-image" :src="'http://' + item" />
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 搜索框 -->
			<Search @click-button="handleClickButton" @change="handleSearchChange" button />
			
			<!-- 公告 -->
			<view class="notice">
				<image class="notice-image" src="../../static/icon/notice.png" mode />
				<!-- 暂无公告 -->
				<view v-if="noticeList.length==0" class="notice-swiper notice-empty">暂无公告</view>
				<!-- 公告列表 -->
				<swiper
					v-else
					class="notice-swiper"
					:vertical="true"
					:autoplay="true"
					:circular="true"
					:interval="3000"
					:duration="300"
					@click="handleLinkNotice"
				>
					<swiper-item class="notice-swiper-item" v-for="(item, index) in noticeList" :key="index">
						<text class="notice-title">{{item}}</text>
					</swiper-item>
				</swiper>
			</view>
			
			<!-- 导航菜单 -->
			<view class="grid">
				<view
					class="grid-item"
					v-for="(item, index) in gridConfig"
					:key="item.text"
					@click="handleNavigateLink(item.path, item.isTabbarPage)"
				>
					<image class="grid-image" :src="`../../static/icon/grid/grid-${index+1}.png`" mode />
					<text>{{item.text}}</text>
				</view>
			</view>
			
			<!-- 待办事项 -->
			<view class="todos-title">
				<text>待办事项</text>
				<text><text style="color: #4190F5;">{{todoCount}}</text>项</text>
			</view>
			
			<view class="todos-list">
				<!-- 急修 -->
				<RepairCard
					v-for="record in todoList.repair"
					:key="record.repair_id"
					:record="record"
					type="repair"
					hasTag
					hasButton
					@click="handleLinkRepair($event, record.repair_id)"
				/>
				<!-- 保养 -->
				<RepairCard
					v-for="record in todoList.maint"
					:key="record.id"
					:record="record"
					type="maint"
					hasTag
					hasButton
					@click="handleLinkMaint($event, record.id)"
				/>
				<!-- 证件到期 -->
				<PromptCard
					v-for="record in todoList.prompt"
					:key="record.id"
					:record="record"
				/>
			</view>
			
		</view>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import PromptCard from '../../components/PromptCard/PromptCard.vue'
	import gridConfig from './gridConfig.js'
	import debounce from '../../utils/debounce.js'
	import request from '../../service/request.js'
	import todos from '../../data/todos.js'
	
	export default {
		components: {
			TabbarPage,
			Search,
			RepairCard,
			PromptCard
		},
		data: () => ({
			swiperList: [],
			noticeList: [],
			gridConfig,
			value: '',
			todoList: {},
			todoCount: 0
		}),
		methods: {
			handleNavigateLink(path, isTabbarPage) {
				const option = {url: path}
				if(isTabbarPage) uni.reLaunch(option)
				else uni.navigateTo(option)
			},
			handleSearchChange: debounce(function(value) {
				console.log(value)
			}, 300),
			handleClickButton() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})
			},
			handleLinkNotice(){
				uni.navigateTo({url: '/pages/notice/notice'})
			},
			handleLinkBind(){
				uni.navigateTo({url: '/pages/login/login'})
			},
			handleLinkRepair(e, id) {
				uni.navigateTo({
					url: '/pages/repairDetail/repairDetail?id=' + id
				})
			},
			handleLinkMaint(e, id) {
				console.log('跳转维保工单详情页面: ' + id)
			},
			// 请求banner
			async requestBanner() {
				var res = await request.post('/backlog/banner')
				var imageList = res.data.map(item => {
					item.image_url.replace(/\\/g, '/').replace(/\s/g, '/')
					return item.image_url
				})
				console.log(imageList)
				this.swiperList = imageList
			},
			// 请求公告
			async requestNotice() {
				var res = await request.post('/jobs/lists', {
					limit: 100,
					page: 1,
					type: 0
				})
				this.noticeList = res.data.map(i=>i.title)
			},
			// 待办事项处理
			async requestTodoWork() {
				var res = await request.post('/backlog')
				this.todoList = res.data
				this.todoCount = Object.values(res.data).reduce((p,i)=>[...p, ...i], []).length
			}
		},
		onLoad: async function() {
			try{
				var _this_ = this
				var res = await request.login()
				console.log(res)
				if(res.code == -1){
					// this.publicPop = true
					setTimeout(()=>{
						uni.showModal({
							title: '关注公众号',
							content: '请先关注“梯联宝”公众号，然后进行账号绑定',
							showCancel: false,
							success() {
								_this_.handleLinkBind()
							}
						})
					}, 2000)
				}
				else if(res.code == -2){
					uni.showModal({
						title: '绑定账号',
						content: res.msg,
						showCancel: false,
						success(res) {
							if(res.confirm){
								_this_.handleLinkBind()
							}
						}
					})
				}
				else if(res.code == 1){
					var token = res.data.token
					// 存储token
					uni.setStorageSync('token', token)
					this.$store.commit('setBaseUrl', res.data.request_url)
					this.$store.commit('setUserInfo', res.data)
					// 请求banner
					await this.requestBanner()
					// 请求公告列表
					await this.requestNotice()
					// 请求代办事项
					await this.requestTodoWork()
				}
				else {
					setTimeout(() => {
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: '账号登录失败，即将前往绑定页面重新登录',
							success() {
								_this_.handleLinkBind()
							}
						})
					}, 1200)
				}
			}catch(e){
				console.log(e)
			}
		},
		// 刷新首页
		onPullDownRefresh: async function() {
			await this.requestTodoWork()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style>
	@import url("../../static/css/page.css");
</style>

<style scoped>
	/* 页面容器 */
	.container{
		background-color: #f9f9f9;
	}
	
	/* banner */
	.swiper{
		height: 345rpx;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.swper-image{
		width: 100%;
		height: 100%;
	}
	
	/* 公告 */
	.notice{
		height: 100rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		background-color: #FFFFFF;
	}
	.notice-image{
		margin: 0 30rpx 0 45rpx;
		width: 36rpx;
		height: 32rpx;
	}
	.notice-empty{
		color: #999999;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}
	.notice-swiper{
		width: calc(100% - 120rpx);
		height: 60%;
	}
	.notice-swiper-item{
		width: 100%;
		display: flex;
		align-items: center;
		height: 100%;
	}
	.notice-title{
		width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		font-size: 26rpx;
		color: #000000;
	}
	
	/* 导航菜单 */
	.grid{
		width: 100%;
		height: 378rpx;
		padding: 30rpx 0;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-content: space-between;
	}
	.grid-item{
		width: 22%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
	}
	.grid-image{
		width: 85rpx;
		height: 85rpx;
		margin-bottom: 21rpx;
	}
	
	/* 待办事项 */
	.todos-title{
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #000000;
		background-color: #FFFFFF;
		border-bottom: solid 1px #EEEEEE;
		position: sticky;
		top: 0;
		left: 0;
	}
	
	.todos-list{
		padding-top: 0.5px;
		padding-bottom: 30rpx;
		background-color: #FFFFFF;
	}
</style>
