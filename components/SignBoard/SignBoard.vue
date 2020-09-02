<template>
	<view>
		<view class="canvas-box">
			<canvas
				class="mycanvas"
				canvas-id="mycanvas"
				:disable-scroll="true"
				@touchstart="touchstart"
				@touchmove="touchmove"
				@touchend="touchend"
			/>
		</view>
		<view class="footer">
			<view class="right" @click="clear">清除</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			save: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				ctx: null,         //绘图图像
				points: []       //路径点集合 
			}
		},
		mounted() {
			this.ctx = uni.createCanvasContext("mycanvas", this);   //创建绘图对象
			
			//设置画笔样式
			this.ctx.lineWidth = 2;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
		},
		methods: {
			//触摸开始，获取到起点
			touchstart:function(e){
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {X:startX,Y:startY};
				
				/* **************************************************
					#由于uni对canvas的实现有所不同，这里需要把起点存起来
				 * **************************************************/
				this.points.push(startPoint);
				
				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},
			
			//触摸移动，获取到路径点
			touchmove: function(e){
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
			touchend: function(){                   
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
			clear: function(){
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
			finish: function() {
				var _this_ = this
				return new Promise((resolve, reject) => {
					uni.canvasToTempFilePath({
					  canvasId: 'mycanvas',
					  success: function(res) {
							resolve(res.tempFilePath)
					  },
						fail(err) {
							reject(err)
						}
					}, _this_)
				})
			}
		}
	}
</script>

<style>
	.canvas-box{
		width: 100%;
		height: 294rpx;
		border-radius: 6rpx;
		background-color: #F9F9F9;
		position: relative;
	}
	.mycanvas{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.footer{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.left, .right{
		width: 120rpx;
		height: 50rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #4190F5;
		background-color: rgba(65, 144, 245, 0.2);
	}
</style>

