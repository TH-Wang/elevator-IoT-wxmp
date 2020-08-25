<template>
	<view class="main">
		<view class="main-list-tab" :class="float?'topPost':''">
			<van-tabs :active="active" color="#4190F5" @click="onChange">
				<van-tab title="待处理" name="1"></van-tab>
				<van-tab title="进行中" name="2"></van-tab>
				<van-tab title="已完成" name="3"></van-tab>
				<van-tab title="全部" name="4"></van-tab>
			</van-tabs>
		</view>
		<view class="main-list" v-if="list.length > 0">
			<view class="main-list-li" v-for="(item,index) in list" :key="index">
				<view class="main-list-li-ttle">
					<view class="main-list-li-ttle-name">{{ item.title }}</view>
					<view class="main-list-li-ttle-time">{{ item.time }}</view>
				</view>
				<view class="main-list-li-num">
					电梯编号: {{ item.num }}
				</view>
				<view class="main-list-li-fot">
					<view class="main-list-li-fot-addres">
						{{ item.addres }}
					</view>
					<view class="main-list-li-fot-btn">
						<text class="main-list-li-fot-btn-d" v-if="item.studes==1">待处理</text>
						<text class="main-list-li-fot-btn-z" v-if="item.studes==2">进行中</text>
						<text class="main-list-li-fot-btn-w" v-if="item.studes==3">已完成</text>
					</view>
				</view>
			</view>
			<!-- 加载中/没有更多数据 -->
			<uni-load-more iconType="snow" :iconSize="14" :status="status" />
		</view>
		<!-- 没有数据 -->
		<view class="null" v-else>
			<Null :title="title"></Null>
		</view>
	</view>
</template>

<script>
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import request from '@/service/request.js'
	export default {
		components:{
			Null,uniLoadMore
		},
		data() {
			return {
				status: 'more',
				active: "1",
				float: false,
				title: '暂无数据',
				list: [
					{
						title: '这是电梯名称',
						time: '2020-11-11',
						num: '23000300',
						addres: '重庆市九龙坡区歇台子渝州路126号',
						studes: '1'
					},
					{
						title: '这是电梯名称',
						time: '2020-11-11',
						num: '23000300',
						addres: '重庆市九龙坡区歇台子渝州路126号',
						studes: '1'
					},
					{
						title: '这是电梯名称',
						time: '2020-11-11',
						num: '23000300',
						addres: '重庆市九龙坡区歇台子渝州路126号',
						studes: '1'
					},
					{
						title: '这是电梯名称',
						time: '2020-11-11',
						num: '23000300',
						addres: '重庆市九龙坡区歇台子渝州路126号',
						studes: '1'
					},
					{
						title: '这是电梯名称',
						time: '2020-11-11',
						num: '23000300',
						addres: '重庆市九龙坡区歇台子渝州路126号',
						studes: '1'
					}
				],
				contentText: {
				    contentdown: '上拉加载更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多'
				}
			}
		},
		methods: {
			onChange(event) {
				console.log(event.detail)
				let id = event.detail.name;
			},
		},
		onPullDownRefresh(){
			console.log('下拉开始')
			setTimeout(function () {
				console.log('下拉结束')
			   uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('上拉开始')
			let that = this;
			that.status = 'loading'
			setTimeout(function () {
				console.log('上拉结束')
				that.status = 'noMore'
				console.log(that.status)
			}, 2000);
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

<style scoped>
	.main{
		min-height: 100vh;
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
	}

	.main-list-li-ttle-time {
		font-size: 24rpx;
		color: #999;
		margin-left: 40rpx;
	}

	.main-list-li-num {
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.main-list-li-fot {
		margin-top: 20rpx;
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
</style>
