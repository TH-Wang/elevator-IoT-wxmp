<template>
	<view>
		<view class="mainhead">
			<view class="calendar-content" v-if="showCalendar">
				<view class="contboxs">
					<view class="listnav">
						<view class="today">
							<view class="clor1"></view>
							<view class="totxt">今天</view>
						</view>
						<view class="today">
							<view class="clor2"></view>
							<view class="totxt">超期</view>
						</view>
						<view class="today">
							<view class="clor3"></view>
							<view class="totxt">待处理</view>
						</view>
						<view class="today">
							<view class="clor4"></view>
							<view class="totxt">已完成</view>
						</view>
					</view>
					<!-- 插入模式 -->
					<uni-calendar ref="calendar" class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change" @click="bindDateChange" :confirm="confirm" />
				</view>
				<!-- <uni-section title="弹出模式" type="line"></uni-section> -->
				<!-- <view class="example-body">
					<button class="calendar-button" type="button" @click="open">打开日历</button>
				</view> -->
				<!-- <uni-calendar ref="calendar" class="uni-calendar--hook" :clear-date="true" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range" @confirm="confirm" @close="close" /> -->
			</view>
			
		</view>
		<view class="main">
			<view class="main-list-tab" >
				<van-tabs :active="active" color="#4190F5" @click="onChange">
					<van-tab title="待处理" name="1"></van-tab>
					<van-tab title="进行中" name="3"></van-tab>
					<van-tab title="已完成" name="2"></van-tab>
					<van-tab title="全部" name="0"></van-tab>
				</van-tabs>
			</view>
			<view class="main-list" v-if="list.length > 0">
				<navigator class="main-list-li" v-for="(item,index) in list" :key="index" :url="'/pages/workdel/workdel?id='+item.id">
					<view class="main-list-li-ttle">
						<view class="main-list-li-ttle-name">
						  <view class="stutstxt head1" v-if="item.main_type!=''">{{item.main_type}}</view>
						  <!-- <view class="stutstxt head1" v-if="item.main_type==1">半月保</view> -->
						  <!-- <view class="stutstxt head2" v-if="item.status==2">月保</view>
						  <view class="stutstxt head3" v-if="item.status==3">半年保</view>
						  <view class="stutstxt head4" v-if="item.status==4">半年保</view> -->
						  <view class="headconts">{{ item.ele_name }}</view>
						</view>
						<view class="main-list-li-ttle-time">{{ item.maint_time }}</view>
					</view>
					<view class="main-list-li-num">
						<image src="../../static/image/yfm/gs.png"></image>
						<view class="txtms">{{ item.elevator_number }}</view>
					</view>
					<view class="main-list-li-fot">
						<view class="main-list-li-fot-addres">
							<image src="../../static/image/yfm/ads.png"></image>
							<view class="txtms">{{ item.address }}</view>
						</view>
						<view class="main-list-li-fot-btn">
							<text class="main-list-li-fot-btn-d" v-if="item.is_maintain==1">待处理</text>
							<text class="main-list-li-fot-btn-z" v-if="item.is_maintain==3">进行中</text>
							<text class="main-list-li-fot-btn-w" v-if="item.is_maintain==2">已完成</text>
						</view>
					</view>
				</navigator>
				<!-- 加载中/没有更多数据 -->
				<uni-load-more iconType="snow" :iconSize="14" :status="status" />
			</view>
			<!-- 没有数据 -->
			<view class="null" v-if="list<=0">
				<Null :title="title"></Null>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 获取任意时间
	 */
	import uniCalendar from "@/components/uni-calendar/uni-calendar.vue"
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import request from '@/service/request.js'
	// request.post('/backlog/banner',data).then((res) =>{
	// 	console.log(res)
	// })
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		components: {
			uniCalendar,
			Null,uniLoadMore
		},
		data() {
			return {
				chantime:'',//时间
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				type: '1',
				page: 1,
				size: 10,
				isMore: true, //是否可以可以上拉
				status: 'more',
				active: '1',
				float: false,
				title: '暂无数据',
				list: [
					
				],
				contentText: {
				    contentdown: '上拉加载更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多'
				}
			}
		},
		onReady() {
			let that = this;
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [
					
					
				]
			}, 100)
			that.getList(that.type,1,this.getCurrentMonthFirst());
			this.caltime(this.getCurrentMonthFirst())
		},
		onLoad(){
			
			
		},
		methods: {
			// 跳转维保工单
			// workorderbtn(){
			// 	uni.navigateTo({
			// 		url:'../workOrder/workOrder'
			// 	})
			// },
			//时间戳转换方法    date:时间戳数字
			
			formatDate(date) {
			  var date = new Date(date*1000);
			  var YY = date.getFullYear() + '-';
			  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
			  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
			  return YY + MM + DD ;
			},
			// 日历
			caltime(time){
				request.post('/maint/calendar',{
					month:time
				}).then((res) =>{
					console.log(res)
					var das=res.data
					this.info.selected=[]
					if(res.code==1){
						for(var i=0;i<das.length;i++){
							if(das[i].is_maintain==-1){
								this.info.selected.push({date:this.formatDate(das[i].maint_time),class:'timenone'})
							}else if(das[i].is_maintain==1){
								this.info.selected.push({date:this.formatDate(das[i].maint_time),class:'timetow'})
							}else if(das[i].is_maintain==2){
								this.info.selected.push({date:this.formatDate(das[i].maint_time),class:'timebox'})
							}
						}
					}
				})
			},
			
			// 获取当前月第一天
			getCurrentMonthFirst(){
			        var date = new Date();
			        date.setDate(1);
			        var month = parseInt(date.getMonth()+1);
			        var day = date.getDate();
			        if (month < 10) {
			            month = '0' + month
			        }
			        if (day < 10) {
			            day = '0' + day
			        }
					this.chantime=date.getFullYear() + '-' + month + '-' + day
			        return date.getFullYear() + '-' + month + '-' + day;
			    },
			open() {
				this.$refs.calendar.open()
			},
			
			change(e) {
				console.log('change 返回:', e)
				this.caltime(e.fulldate)
				this.getList(this.type,1,e.fulldate,1)
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			onChange(event) {
				
				let that = this,
				 id = event.detail.name;
				that.type = id;
				that.page = 1;
				that.isMore = true;
				that.status = 'more';
				// 切换tab设置页面返回顶部
				uni.pageScrollTo({ 
				　　scrollTop: 0, duration: 300 
				}); 
				that.getList(id,that.page,this.chantime,0);
			},
			getList(type,page,time,isla){
				//type 数据类型
				//page 页数
				//isla 0正常加载 1下拉刷新 2上拉加载
				let that = this;
				let data = {
					type: type,
					page: page,
					limit: that.size,
					time:time,
				};
				request.post('/maint',data).then((res) =>{
					if(res.code == 1){
						if(res.data.length < 10){
							that.isMore = false;
							that.status = 'noMore'
						}
						if(isla == 0){
							that.list = [];
							that.list = res.data;
						}else if(isla == 1){
							that.list = [];
							that.list = res.data;
							uni.stopPullDownRefresh();
							console.log(that.list)
						}else{
							that.list = that.list.concat(res.data)
							
						}
						
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			}
		},
		onPullDownRefresh(){
			console.log('下拉开始')
			let that = this;
			that.page = 1;
			that.isMore = true;
			that.status = 'loading';
			that.getList(that.type,that.page,this.chantime,1);
		},
		onReachBottom(){
			console.log('上拉开始')
			let that = this;
			console.log(that.isMore)
			if(that.isMore == true){
				let pageNumber = that.page + 1;
				that.status = 'loading';
				that.page = pageNumber;
				console.log(pageNumber)
				that.getList(that.type,pageNumber,this.chantime,2)
			}
		},
		/**
		 * 屏幕滚动监听
		 */
		onPageScroll(event) {
			let that = this;
			if (event.scrollTop > 44 && !that.float) {
				that.float = true; 
			} else if (event.scrollTop < 5 && that.float) {
				that.float = false; 
			}
		},
	}
</script>

<style>
	.null{
		position: relative;
		top: 50%;
		padding-top: 50%;
		box-sizing: border-box;
	}
	.timebox{
		
		width: 66rpx !important;
		height: 66rpx !important;
		border-radius: 50% !important;
		border: 1rpx solid #10C367;
		left: 0 !important;
		top: 0 !important;
		background: none !important;
	}
	.uni-calendar-item--checked{
		background-color: none !important;
		/* color: #333 !important; */

	}
	.timetow{
		width: 66rpx !important;
		height: 66rpx !important;
		border-radius: 50% !important;
		border: 1rpx solid rgba(253,144,38,1) !important;
		left: 0 !important;
		top: 0 !important;
		background: none !important;
	}
	.timenone{
		width: 66rpx !important;
		height: 66rpx !important;
		border-radius: 50% !important;
		border: 1rpx solid #FF8D87;
		left: 0 !important;
		top: 0 !important;
		background: none !important;
	}
	.main-list-li-num,.main-list-li-fot-addres{
		display: flex;
		align-items: center;
	}
	.main-list-li-num image,.main-list-li-fot-addres image{
		width: 26rpx;
		height: 26rpx;
		margin: 16rpx;
	}
	.head1{
		background: #21CFCF;
	}
	.head2{
		background: #FF8D87;
	}
	.head3{
		background: #968EEC;
	}
	.head4{
		background: #FFC061;
	}
	.stutstxt{
		display: flex;
		align-items: center;
		height: 40rpx;
		border-radius: 5rpx;
		padding:0 10rpx;
		color: #FFFFFF;
		font-size: 22rpx;
		margin-right: 20rpx;
	}
	.main{
		min-height: auto;
	}
	/** 动画 */
	@keyframes show {
		0% {
			transform: translateY(-100%);
			opacity: 0.5;
		}
	
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
	
	.topPost {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		animation: show 0.3s;
	}
	
	.main-list {
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	
	.main-list-li {
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFF9F4;
		border-radius: 8rpx;
		margin-top: 30rpx;
	}
	
	.main-list-li:first-of-type {
		margin-top: 0rpx;
	}
	
	.main-list-li-ttle {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.main-list-li-ttle-name {
		flex: 1;
		font-size: 28rpx;
		font-weight: bolder;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
	
	.main-list-li-ttle-time {
		font-size: 24rpx;
		color: #999;
		margin-left: 40rpx;
	}
	
	.main-list-li-num {
		font-size: 28rpx;
		color: #666;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.main-list-li-fot {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.main-list-li-fot-addres {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.main-list-li-fot-btn {
		margin-left: 40rpx;
	}
	
	.main-list-li-fot-btn text {
		font-size: 22rpx;
		padding: 6rpx 18rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
	}
	
	.main-list-li-fot-btn-d {
		background-color: #4190F5;
		color: #fff;
	}
	
	.main-list-li-fot-btn-z {
		background-color: #4190F5;
		color: #FD9026;
	}
	
	.main-list-li-fot-btn-w {
		background-color: #eeeeee;
		color: #999;
	}
	.clor1{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background:linear-gradient(180deg,rgba(65,144,245,1) 0%,rgba(38,176,238,1) 100%);;
	}
	.clor2{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		border:1px solid rgba(255,141,135,1);
		box-sizing: border-box;
	}
	.clor3{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		border:1px solid rgba(253,144,38,1);
		box-sizing: border-box;
	}
	.clor4{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		border:1px solid #10C367;
		box-sizing: border-box;
	}
	.today{
		display: flex;
		align-items: center;
		margin-left: 18rpx;
		
	}
	.totxt{
		font-size: 24rpx;
		margin-left: 8rpx;
	}
	.listnav{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: absolute;
		right: 30rpx;
		top: 32rpx;
	}
	.uni-calendar__header-btn-box{
		width: 30rpx !important;
	}
	.uni-calendar__backtoday{
		display: none;
	}
	.contboxs{
		position: relative;
	}
	.uni-calendar__header{
		left: 0;
		top: 0;
		width: 270rpx !important;
		border: none !important;
		padding-bottom: 30rpx;
	}
	.uni-calendar__weeks-item{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uni-calendar-item--isDay{
		background:linear-gradient(180deg,rgba(65,144,245,1) 0%,rgba(38,176,238,1) 100%) !important;
	}
	.uni-calendar__header-text,.uni-calendar__header-btn{
		color: #2B7AFB !important;
		border-top-color:#2B7AFB !important;
		border-left-color:#2B7AFB !important;
		
	}
	.uni-calendar__header{
		
	}
	.uni-calendar__content{
		border-radius: 20rpx;
	}
	.mainhead{
		width: 100%;
		height: 700rpx;
		background:linear-gradient(180deg,rgba(0,136,255,1) 0%,rgba(33,189,207,1) 100%);
		padding: 28rpx 30rpx;
		box-sizing: border-box;
	}
	.uni-calendar--hook{
		height: 760rpx !important;
	}
	.uni-calendar__header{
		/* height: 50rpx !important; */
	}
	.uni-calendar-checked{
		width: 66rpx !important;
	}
	.uni-calendar-item__weeks-box.data-v-09f1e40c{
		width: 66rpx !important;
		height: 66rpx !important;
	}
	.uni-calendar-item__weeks-lunar-text{
		display: none;
	}
	.uni-calendar-item--checked.data-v-09f1e40c{
		border-radius: 50% !important;
	}
	.uni-calendar-item__weeks-box-circle{
		/* width: 66rpx !important;
		height: 66rpx !important;
		background: #007aff !important;
		left: 0 !important;
		top: 0 !important;
		border-radius: 50%; */
		/* display: none; */
	}
	
	.uni-calendar-item--isDay.data-v-09f1e40c{
		border-radius: 50% !important;
	}
	.uni-calendar-item__weeks-box-item{
		width: 66rpx !important;
		height: 66rpx !important;
	}
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
</style>