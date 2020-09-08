<template>
	<view class="cptbox">
		<Steps :steps="steps" :type="1" />
		
		<view class="qdcont">
			<view class="qdlist">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/people.png"></image>
					<text>维保人员：{{dataSource.basis.user_name}}</text>
				</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/time.png"></image>
					<text>维保时间：{{dataSource.basis.maint_end_time}}</text>
				</view>
				<view class="qdbtns qdindes"  v-if="is_qanfal">已签到</view>
				<view class="qdbtns " @click="qiandaobtn" v-if="!is_qanfal">签到</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/address.png"></image>
					<text>所在小区：{{dataSource.ele.village_name}}</text>
				</view>
			</view>
		</view>
	
	    <view class="wbcont">
			<view class="headcont">
				<view class="wbnum">维保项目</view>
				<view class="rigtwbnum">（{{wblist.length}}）</view>
			</view>
			<view class="wblist">
				<view class="wbnavcont" v-for="(item,index) of wblist" :key="item.name" @click="workOrderbtn(item.id)">
					<view class="wbname"  >{{item.name}}</view>
					<view class="wbrightnum">
						<view class="znum" >总数<text class="texcol1">{{quanbus[index]}}</text></view>/
						<view class="znum" >合格<text class="texcol2">{{hegenum[index]}}</text></view>/
						<view class="znum" >不合格<text class="texcol3">{{wxbnum[index]}}</text></view>
						<van-icon name="arrow" />
					</view>
				</view>
			</view>
		</view>
	
	  <SignInModal :visible="signInSuccess" @close="signInSuccess = false" />
	</view>
</template>

<script>
	var x = 20;
	var y =20;
	import Steps from '../../components/Steps/Steps.vue'
	import request from '@/service/request.js'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import SignInModal from '../../components/SignInModal/SignInModal.vue'
	import app from '../../App.vue'
	
	export default {
		components: {
			Steps,
			CommonButton,
			SignInModal
		},
	  data: () => ({
			quanbus:[],//全部
			wxbnum:[],//不合格
			hegenum:[],//合格
			coniden:'',//签字人员：1安全人员；2维保员；3物业；（有参数signature_image，就必须有本参数）
			dataid:'',//详情ID
			marcont:'',//签字备注
			ctx:'',         //绘图图像
			points:[],       //路径点集合 
			show:false,
		  // 维保项目
		  dataSource:'',
		  wblist:[   //项目列表
		  			  // {name:'机房',znum:'103',hgnum:'100',nhgnum:'3' },
		  			 
		  ],
		  is_qanfal:false,
	      active: 0,
		  steps: [
				{
					type: 1,
					title: '待处理',
					time: ''
				},
				{
					type: 2,
					title: '进行中',
					time: ''
				},
				{
					type: 3,
					title: '已完成',
					time: ''
				}
			]
		}),
	  onLoad(cont) {
	  	this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
	  	//设置画笔样式
	  	this.ctx.lineWidth = 4;
	  	this.ctx.lineCap = "round"
	  	this.ctx.lineJoin = "round"
			console.log(cont)
			this.contdel(cont.id)
			this.dataid=cont.id
			
			
			this.xmlist(cont.id)
			this.falqiand(cont.id)
	  },
	  methods:{
		  // 维保项目
		workOrderbtn(id){
			uni.navigateTo({
				url:'../workOrder/workOrder?id='+id+'&maint_id='+this.dataid
			})
		}, 
		//提交
		  qdbtns(){
			  
		  },
		  // 签到
		  qiandaobtn(){
			  var _this_=this
			  request.post('/maint/sign_in',{
			  	id:_this_.dataid,
			  	is_qan:1
			  }).then((res) =>{
			  	if(res.code == 1){
					this.falqiand()
					this.contdel(dataid)
			  		uni.showToast({
			  			title:'签到成功',
						duration:1500
			  		})
			  	}
			  })
		  },
		  // 判断是否签到
		  falqiand(){
			var _this_=this
			request.post('/maint/verify_location',{
				id:_this_.dataid,
			}).then((res) =>{
				if(res.code == 1){
					console.log(res)
					if( res.data.is_qan==1){
						_this_.is_qanfal=true
					}else{
						_this_.is_qanfal=false
					}
				}
			})  
		  },
	    // 项目列表
		xmlist(id){
			var _this_=this
			request.post('/maint/xm_classify',{
				id:id,
				type:0
			}).then((data) =>{
				console.log(data)
				if(data.code == 1){
					
					for(var i=0;i<data.data.length;i++){
						
						request.post('/maint/main_xm',{
							id:data.data[i].id,
							maint_id:id,
							type:0
						}).then((res) =>{
							if(res.code == 1){
								_this_.quanbus.push(res.data.length)
							}
						})
						request.post('/maint/main_xm',{
							id:data.data[i].id,
							maint_id:id,
							type:1
						}).then((res) =>{
							if(res.code == 1){
								_this_.wxbnum.push(res.data.length)
							}
						})
						request.post('/maint/main_xm',{
							id:data.data[i].id,
							maint_id:id,
							type:2
						}).then((res) =>{
							if(res.code == 1){
								_this_.hegenum.push(res.data.length)
							}
						})
						
					}
					_this_.wblist=data.data
					console.log(_this_.quanbus)
					
				}else{
					uni.showToast({
						title:res.message,
						icon:"none"
					})
				}
			})
		},
		// 详情
		contdel(id){
			var _this_=this
			this.steps=[]
			request.post('/maint/maint_one',{
				id:id
			}).then((res) =>{
				console.log(res)
				if(res.code == 1){
					_this_.dataSource=res.data
					_this_.coniden=res.data.basis.iden
					for(var i=0;i<res.data.log_time.length;i++){
						_this_.steps.push({text:res.data.log_time[i].time,desc:res.data.log_time[i].type})
					}
					
					
					for(var i=0;i<res.data.log_time.length;i++){
						console.log(res.data.log_time[i].time)
						if(res.data.log_time[i].time==''){
							return _this_.active=i-1 
						}
					}
					
					
					
				}else{
					uni.showToast({
						title:res.message,
						icon:"none"
					})
				}
			})
		},
		  
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
			let _this_ = this;
			uni.getSystemInfo({
				success: function(res) {
					let canvasw = res.windowWidth;
					let canvash = res.windowHeight;
					_this_.ctx.clearRect(0, 0, canvasw, canvash);
					_this_.ctx.draw(true);
				},
			})
		},
		
		//完成绘画并保存到本地
		finish:function(){
			var _this_=this
			
			uni.canvasToTempFilePath({
			  canvasId: 'mycanvas',
			  success: function(res) {
				  console.log(res)
			    let path = res.tempFilePath;
				app.globalData.isHeader = true;
				var token = uni.getStorageSync('token')
				uni.uploadFile({
				          url: 'https://wcs.xdiot.net/api/upload_file' , //仅为示例，非真实的接口地址
				          filePath: path,
				          name: "file",
				          header: {
				          "Content-Type": "multipart/form-data",
						  "token": token,
				          },
				          formData: {
							order_id:_this_.dataid,
							file_type:'3',
							file_belong:'2',
							file:'file',
				          },
				          success: function (res) {
				            var data = res.data
							console.log(data)
							var dataw=JSON.parse(data)
				            console.log(dataw.data.length )
							//发送请求
							uni.request({
								url: 'https://wcs.xdiot.net/api/maint/signature',
								method: 'POST',
								header: {
									"token": token,
									'Content-Type':'multipart/form-data',
								},
								data:{
									id:_this_.dataid,
									image:dataw.data[dataw.data.length-1].file_url,
									type:_this_.coniden,
									remark:_this_.marcont
								},
								success: res => {
									console.log(res.data)
									if(res.data.code==1){
										_this_.clear()
										_this_.show=false
									}
									
								},
								fail: (err) => {
								}
							});
							
				          }
				        })
				
				
				
				
				
				// uni.saveImageToPhotosAlbum({
				// 	filePath:path,
				// })
			  } 
			})
		},
				
				
		   onClickShow() {
			  
		      this.show=true;
		    },
			onClickHide() {
			    this.show=false;
			},

	  }
	}
</script>

<style>
	.qdindes{
		background: #999999 !important;
	}
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
