<template>
	<view class="ele-info" :class="isShow?'anme1':'anme2'">
		<!-- 电梯 -->
		<view class="ele-box">
			<image src="../../static/image/wxj/dt.png" mode=""></image>
			<view class="ele-box-num">15</view>
			<view class="room">
				<view class="room_1" :class="isShow?'':'room-an1'">
					<image src="../../static/image/wxj/2.png" mode=""></image>
				</view>
				<view class="room_2" :class="isShow?'':'room-an2'">
					<image src="../../static/image/wxj/1.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="ele-info-btn" @click="openTapBar()">
			<image src="../../static/image/wxj/more.png" mode=""></image>
		</view>
		<!-- 菜单栏 -->
		<view class="menu-bar" :class="isBar?'show':'none'">
			<!-- 菜单列表 -->
			<view class="menu-bar-list">
				<view class="menu-bar-list-li" :class="item.id == active?'bar_active':''" v-for="(item, index) in bar" :key="item.id" @click="offTapBar(item.id)">{{ item.name }}<image v-if="item.isImg" :src="item.img" mode=""></image></view>
			</view>
			<!-- 菜单详细 -->
			<view class="menu-bar-info" :class="active==1?'show':'none'">
				<view class="menu-bar-info-stuts">
					<view class="menu-bar-info-stuts-one">
						<view class="menu-bar-info-stuts-one-title">
							门锁状态：
						</view>
						<view class="menu-bar-info-stuts-one-iskg">
							<view class="menu-bar-info-stuts-one-iskg-k" :class="isKai?'textClore':''">
								<text class="dian" :class="isKai?'bgTextClor':''"></text> 开门
							</view>
							<view class="menu-bar-info-stuts-one-iskg-g" :class="isKai?'':'textClore'">
								<text class="dian" :class="isKai?'':'bgTextClor'"></text> 关门
							</view>
						</view>
					</view>
					<view class="menu-bar-info-stuts-list">
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
					</view>
				</view>
				
				<view class="menu-bar-info-list">
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">上召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">下召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">内召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
				</view>
				<view class="menu-bar-info-btn">
					<text class="menu-bar-info-btn-hj">呼梯</text>
					<text class="menu-bar-info-btn-jy">5G救援</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isKai: false,
				active: 0,
				isBar: false,
				isShow: true,
				name:'电梯监控详情 ',
				bar:[
					{id:1,name:'电梯状态',img:'../../static/image/wxj/top.png',isImg:false},
					{id:2,name:'电梯信息',img:'../../static/image/wxj/top.png',isImg:false},
					{id:3,name:'电梯参数',img:'../../static/image/wxj/top.png',isImg:false},
					{id:4,name:'运行统计',img:'../../static/image/wxj/top.png',isImg:false},
					{id:5,name:'维保记录',img:'../../static/image/wxj/top.png',isImg:false},
					{id:6,name:'故障记录',img:'../../static/image/wxj/top.png',isImg:false},
					{id:7,name:'内部IO',img:'../../static/image/wxj/top.png',isImg:false},
					{id:8,name:'收起',img:'../../static/image/wxj/top.png',isImg:true}
				]
			}
		},
		onLoad: function(option) {
			this.name = option.name;
		},
		onReady: function(){
			let that = this;
			uni.setNavigationBarTitle({
			　　title: that.name
			})
			setInterval(function(){
				that.isShow = !that.isShow;
			},6000)
		},
		methods: {
			openTapBar(){
				let that = this;
				that.isBar = true;
			},
			offTapBar(id){
				let that = this;
				that.active = id;
				if(id == 1){
					console.log(id)
				}else if(id == 2){
					console.log(id)
				}
				else if(id == 3){
					console.log(id)
				}
				else if(id == 4){
					console.log(id)
				}
				else if(id == 5){
					console.log(id)
				}
				else if(id == 6){
					console.log(id)
				}
				else if(id == 7){
					console.log(id)
				}
				else{
					that.isBar = false;
				}
			}
		}
	}
</script>

<style scoped>
	.textClore{
		color: #0088FF !important;
	}
	.bgTextClor{
		background-color: #0088FF !important;
	}
	.show{
		display: block;
	}
	.none{
		display: none;
	}
	/* 背景动画 */
	@keyframes up{
		0% {
		   background-position: 0 0;
		}
		25%{
			background-position: 0 25%;
		}
		50%{
			background-position: 0 50%;
		}
		75%{
			background-position: 0 25%;
		}
		100% {
		  background-position: 0 0;
		}
	}
	@keyframes roomLeft{
		0%{
			width: 50%;
		}
		50%{
			width: 0%;
		}
		100%{
			width: 50%;
		}
	}
	@keyframes roomRight{
		0%{
			width: 50%;
		}
		50%{
			width: -0%;
		}
		100%{
			width: 50%;
		}
	}
	.ele-info{
		background-image: url('https://wcs.xdiot.net/public/static/images/ele2/bg1.jpg');
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-size: cover;
		animation: up 16s linear infinite normal;
	}
	.anme1{
		animation-play-state:running;
	}
	.anme2{
		animation-play-state:paused;
	}
	.ele-box{
		position: fixed;
		width: 100%;
		height: 800rpx;
		box-sizing: border-box;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 2;
	}
	.ele-box image{
		width: 100%;
		height: 100%;
	}
	.room{
		width: 196rpx;
		height: 422rpx;
		position: absolute;
		top: 56%;
		left: 31%;
		transform: translate(-50%,-50%);
		z-index: 3;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.room_1,.room_2{
		flex: 1;
	}
	.room_1 image,.room_2 image{
		width: 100%;
		height: 100%;
	}
	.room_1{
		width: 50%;
		height: 100%;
		position: absolute;
		left: 0;
	}
	.room-an1{
		animation: roomLeft 6s linear 1 normal;
	}
	.room_2{
		width: 50%;
		height: 408rpx;
		position: absolute;
		right: 0;
	}
	.room-an2{
		animation: roomRight 6s linear 1 normal;
	}
	.ele-box-num{
		font-size: 26rpx;
		color: #b51010;
		font-weight: bold;
		text-align: center;
		width: 120rpx;
		height: 42rpx;
		line-height: 60rpx;
		position: absolute;
		top: 26%;
		right: 50%;
		transform: translate(-50%,-50%);
		z-index: 4;
	}
	.ele-info-btn{
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #0088FF;
		padding: 30rpx;
		box-sizing: border-box;
		z-index: 5;
	}
	.ele-info-btn image{
		width: 100%;
		height: 100%;
	}
	.menu-bar{
		background-color: #ffffff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.menu-bar-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0rpx 40rpx 40rpx;
		box-sizing: border-box;
	}
	.menu-bar-list-li{
		width: 22%;
		line-height: 50rpx;
		text-align: center;
		border-radius: 8rpx;
		border: 2rpx solid #eee;
		font-size: 26rpx;
		color: #333;
		margin-top: 40rpx;
	}
	.menu-bar-list-li image{
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-top: -6rpx;
		margin-left: 10rpx;
	}
	.menu-bar-list-li:last-of-type{
		background-color: rgba(0,136,255,0.05);;
		color: #0088FF;
	}
	.bar_active{
		color: #0088FF !important;
		border: 2rpx solid #0088FF !important;
	}
	.menu-bar-info{
		border-top: 2rpx solid #eee;
	}
	/* 菜单明细 */
	.menu-bar-info{
		padding: 40rpx;
		box-sizing: border-box;
	}
	.menu-bar-info-stuts,.menu-bar-info-list{
		background-color: #f3f3f3;
		border-radius: 8rpx;
	}
	.menu-bar-info-list{
		margin-top: 40rpx;
	}
	.menu-bar-info-stuts-one{
		
	}
	.menu-bar-info-stuts-one{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
	}
	.menu-bar-info-stuts-one-title{
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}
	.menu-bar-info-stuts-one-iskg{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.menu-bar-info-stuts-one-iskg-k{
		margin-right: 20rpx;
	}
	.menu-bar-info-stuts-one-iskg-k,.menu-bar-info-stuts-one-iskg-g{
		font-size: 28rpx;
		color: #333;
		flex: 1;
	}
	.dian{
		padding: 16rpx;
		box-sizing: border-box;
		background-color: #999;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
		vertical-align: middle;
		margin-top: -6rpx;
	}
	.menu-bar-info-stuts-list{
		padding: 0rpx 0rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		border-top: 2rpx solid #eee;
	}
	.menu-bar-info-stuts-list-li{
		width: 20%;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333;
		margin-top: 30rpx;
	}
	.menu-bar-info-stuts-list-li image{
		width: 34rpx;
		height: 34rpx;
		vertical-align: middle;
		margin-top: -6rpx;
		margin-right: 8rpx;
	}
	.menu-bar-info-list-li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #eee;
	}
	.menu-bar-info-list-li:last-of-type{
		border-bottom: none;
	}
	.menu-bar-info-list-li-name{
		font-size: 28rpx;
		color: #333;
		margin-right: 20rpx;
	}
	.menu-bar-info-list-li-bq text{
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 24rpx;
		box-sizing: border-box;
		margin-right: 10rpx;
		color: #fff;
		background-color: #0088FF;
		border-radius: 50%;
		display: inline-block;
	}
	.menu-bar-info-btn{
		margin-top: 40rpx;
		text-align: right;
	}
	.menu-bar-info-btn-hj{
		display: inline-block;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #fff;
		border-radius: 8rpx;
		font-size: 26rpx;
		background-color: #52C28E;
		margin-right: 20rpx;
	}
	.menu-bar-info-btn-jy{
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #fff;
		border-radius: 8rpx;
		font-size: 26rpx;
		background-color: #FF3B30;
		display: inline-block;
		
	}
</style>
