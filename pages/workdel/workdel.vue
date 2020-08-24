<template>
	<view class="cptbox">
		
		<view class="buzcont">
			<van-steps
			  :steps="steps "
			  :active="active"
			  direction="horizontal "
			  active-color="#4190F5"
			/>
		</view>
		<view class="qdcont">
			<view class="qdlist">
				<view class="qdlettxt">
					<image src="../../static/icon/tabbar/mine-active.png"></image>
					<text>维保人员：副书记</text>
				</view>
				<view class="qdbtns" @click="onClickShow">签到</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/time.png"></image>
					<text>维保时间：2020-04-14 14:20:11</text>
				</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/address.png"></image>
					<text>所在小区：是读后各说各话建设公司公司觉得开个会</text>
				</view>
			</view>
		</view>
	
	    <view class="wbcont">
			<view class="headcont">
				<view class="wbnum">维保项目</view>
				<view class="rigtwbnum">（2150）</view>
			</view>
			<view class="wblist">
				<view class="wbnavcont" v-for="(item,index) of wblist">
					<view class="wbname">{{item.name}}</view>
					<view class="wbrightnum">
						<view class="znum">总数<text class="texcol1">{{item.znum}}</text></view>/
						<view class="znum">合格<text class="texcol2">{{item.hgnum}}</text></view>/
						<view class="znum">不合格<text class="texcol3">{{item.nhgnum}}</text></view>
						<van-icon name="arrow" />
					</view>
				</view>
			</view>
		</view>
	
	    <view class="tjbtns">提交</view>
		
		<van-popup  :show="show" @close="onClickHide" >
			<view class="wrapper">
			  <view class="qrbtnqz">签字确认</view>
			  <van-icon name="close" class="closebtns" @click="onClickHide" />
			  <input type="text" placeholder="请输入备信息" class="bzcont" />
			  <view class="qzban">
				  	<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
				  	
				  	<view class="right" @click="clear">清除</view>
			  </view>
			  <view class="btncontqr" @click="finish">确认</view>
			</view>
		</van-popup>
		
		
		
		
		
		
	</view>
</template>

<script>
	var x = 20;
	var y =20;
	export default {
	  data() {
	    return {
			ctx:'',         //绘图图像
			points:[],       //路径点集合 
			show:false,
		  // 维保项目
		  
		  wblist:[
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			  {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' }
		  ],
	      active: 0,
		  steps: [
		        {
		          text: '待处理',
		          desc: '04-11 15:11:23',
		        },
		        {
		          text: '进行中',
		          desc: '04-11 15:11:23',
		        },
		        {
		          text: '已完成',
		          desc: '04-11 15:11:23',
		        },
		       
		      ],
	    }
	  
	      
		  
	  },
	  onLoad() {
	  	this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
	  	
	  	//设置画笔样式
	  	this.ctx.lineWidth = 4;
	  	this.ctx.lineCap = "round"
	  	this.ctx.lineJoin = "round"
	  },
	  mounted() {
	  	
	  },
	  methods:{
		//触摸开始，获取到起点
		touchstart:function(e){
			let startX = e.changedTouches[0].x;
			let startY = e.changedTouches[0].y;
			let startPoint = {X:startX,Y:startY};
			this.points.push(startPoint);
			//每次触摸开始，开启新的路径
			this.ctx.beginPath();
		},
		
		//触摸移动，获取到路径点
		touchmove:function(e){
			let moveX = e.changedTouches[0].x;
			let moveY = e.changedTouches[0].y;
			let movePoint = {X:moveX,Y:moveY};
			this.points.push(movePoint);       //存点
			let len = this.points.length;
			if(len>=2){
				this.draw();                   //绘制路径
			}
			
		},
		
		// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
		touchend:function(){                   
			this.points=[];
		},
		
		/* ***********************************************
		#   绘制笔迹
		#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
		#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
		#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
		************************************************ */
		draw: function() {
			let point1 = this.points[0]
			let point2 = this.points[1]
			this.points.shift()
			this.ctx.moveTo(point1.X, point1.Y)
			this.ctx.lineTo(point2.X, point2.Y)
			this.ctx.stroke()
			this.ctx.draw(true)
		},
		
		//清空画布
		clear:function(){
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					let canvasw = res.windowWidth;
					let canvash = res.windowHeight;
					that.ctx.clearRect(0, 0, canvasw, canvash);
					that.ctx.draw(true);
				},
			})
		},
		
		//完成绘画并保存到本地
		finish:function(){
			uni.canvasToTempFilePath({
			  canvasId: 'mycanvas',
			  success: function(res) {
				  console.log(res)
			    let path = res.tempFilePath;
				uni.saveImageToPhotosAlbum({
					filePath:path,
				})
			  } 
			})
		},
				
				
		   onClickShow() {
			  
		      this.show=true;
			  console.log(this.show)
		    },
			onClickHide() {
			    this.show=false;
			},

	  }
	}
</script>

<style>
	.closebtns{
		font-size: 50rpx;
		right: -14rpx;
		top: -14rpx;
		color: #4190F5;
		position: absolute;
		background: #ffffff;
		border-radius: 50%;
		
	}
	.van-popup {
		border-radius: 10rpx;
		overflow-y: inherit !important;
	}
	.signature {position: fixed;top: 10px;left: 2%;z-index: 999;width:96%;}
		page{
			background: #fff;
		}
		.container {
			padding: 20rpx 0 120rpx 0;
			box-sizing: border-box;
		}
		.title{
			height:50upx;
			line-height: 50upx;
			font-size: 16px;
		}
		.mycanvas{
			width: 100%;
			height: 100%;
		}
		.footer{
			font-size: 14px;
			height: 150upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		
		
		.right{
			position: absolute;
			background:rgba(65,144,245,0.2);
			right: 20rpx;
			bottom: 20rpx;
			width: 120rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #4190F5;
			font-size: 22rpx;
		}
		
	
	
	
	
	
	
	
	
	.van-fade-enter-active{
		border-radius: 10rpx;
	}
	.qzban{
		width: 100%;
		height: 274rpx;
		background:rgba(0,136,255,0.05);
		border-radius: 10rpx;
		margin-top: 30rpx;
		position: relative;
	}
	.btncontqr{
		width: 300rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		margin: 40rpx auto;
		background: #0088FF;
	}
	.bzcont{
		font-size: 24rpx;
		width: 100%;
		height: 80rpx;
		border:1rpx solid rgba(238,238,238,1);
		padding-left: 30rpx;
		box-sizing: border-box;
	}
	.qrbtnqz{
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
	}
	.wrapper{
		position: relative;
		width: 600rpx;
		height: 652rpx;
		background: #ffffff;
		border-radius: 10rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.tjbtns{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 500rpx;
		height: 96rpx;
		color: #ffffff;
		background: #0088FF;
		font-size: 36rpx;
		margin: 80rpx auto;
		border-radius: 10rpx;
	}
	.texcol1{
		color: #4190F5;
	}
	.texcol2{
		color: #52C28E;
	}
	.texcol3{
		color: #FF3B30;
	}
	.znum{
		color: #000000;
		margin:0 20rpx ;
	}
	.wbrightnum{
		display: flex;
		align-items: center;
	}
	.wbrightnum{
		font-size:20rpx ;
		color: #CCCCCC;
	}
	.wblist{
		padding: 0 30rpx;
		
	}
		
	.wbnavcont:last-child{
		border-bottom: none !important;
	}
	.wbnavcont{
		border-bottom: 1rpx solid #EEEEEE;
		height: 86rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.wbnum{
		font-size: 28rpx;
	}
	.rigtwbnum{
		font-size: 24rpx;
		color: #4190F5;
	}
	.headcont{
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.wbcont{
		background: #ffffff;
		margin-top: 20rpx;
	}
	.topmar{
		margin-top: 5rpx;
	}
	.qdbtns{
		width:120rpx;
		height:50rpx;
		background:rgba(65,144,245,1);
		border-radius:10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #ffffff;
	}
	.qdlettxt text{
		margin-left: 20rpx;
		font-size: 24rpx;
	}
	.qdlettxt{
		display: flex;
		align-items: center;
	}
	.qdlettxt image{
		width: 31rpx;
		height: 31rpx;
	}
	.qdlist{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50rpx;
	}
	.qdcont{
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		background: #ffffff;
		height: 200rpx;
		box-sizing: border-box;
	}
	.cptbox{
		min-height: 100vh;
		background: #F9F9F9;
	}
	.buzcont{
		padding: 0 30rpx;
		height: 166rpx;
		background: #ffffff;
		
	}
	.van-step__title{
		/* position: absolute; */
		/* top: 50rpx; */
		text-align: center;
	}
</style>
