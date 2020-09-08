<template>
	<view class="cptbox">
		<Steps :steps="steps" :type="dataSource.basis.is_maintain" />
		
		<view class="qdcont">
			<view class="qdlist">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/people.png"></image>
					<text>维保人员：{{dataSource.basis.user_name}}</text>
				</view>
				<view class="qdbtns qdindes"  v-if="signed">已签到</view>
				<view class="qdbtns " @click="qiandaobtn" v-if="!signed">签到</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/time.png"></image>
					<text>维保时间：{{dataSource.basis.maint_end_time}}</text>
				</view>
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
				<view class="wbnavcont" v-for="(item,index) in wblist" :key="item.name" @click="workOrderbtn(item.id)">
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
			orderId: null,
			quanbus:[],//全部
			wxbnum:[],//不合格
			hegenum:[],//合格
			coniden:'',//签字人员：1安全人员；2维保员；3物业；（有参数signature_image，就必须有本参数）
			dataid:'',//详情ID
			show:false,
		  // 维保项目
		  dataSource: {},
		  wblist:[],
		  signed:false,
			active: 0,
		  steps: [
				{
					type: 1,
					title: '待处理',
					time: ''
				},
				{
					type: 3,
					title: '进行中',
					time: ''
				},
				{
					type: 2,
					title: '已完成',
					time: ''
				}
			]
		}),
		computed: {
			
		},
	  methods:{
			// 请求详情信息
			handleRequestDetailInfo: async function(id) {
				var res = await request.post('/maint/maint_one', {id})
				this.dataSource = res.data
				// 更新时间
				this.steps = this.steps.map(item => {
					var t = res.data.log_time.find(i=>i.type == item.title)
					if(t) item.time = t.time
					return item
				})
			},
		  // 判断是否签到
		  confirmSingIn: async function(){
				var _this_=this
				var res = await request.post('/maint/verify_location',{ id:_this_.orderId, })
				this.signed = Boolean(res.data.is_qan)
		  },
		  // 维保项目
			workOrderbtn(id){
				uni.navigateTo({
					url:'../workOrder/workOrder?id='+id+'&maint_id='+this.dataid
				})
			}, 
			//提交
		  qdbtns(){},
		  // 签到
		  qiandaobtn(){
			  var _this_=this
			  request.post('/maint/sign_in',{
			  	id:_this_.dataid,
			  	is_qan:1
			  }).then((res) =>{
			  	if(res.code == 1){
					this.confirmSingIn()
					this.contdel(dataid)
			  		uni.showToast({
			  			title:'签到成功',
						duration:1500
			  		})
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
				// this.steps=[]
				request.post('/maint/maint_one',{
					id:id
				}).then((res) =>{
					console.log(res)
					if(res.code == 1){
						_this_.dataSource=res.data
						_this_.coniden=res.data.basis.iden
						// for(var i=0;i<res.data.log_time.length;i++){
						// 	_this_.steps.push({text:res.data.log_time[i].time,desc:res.data.log_time[i].type})
						// }
						
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
	  },
	  onLoad: async function(option) {
			var { id } = option
			this.orderId = id
			await this.handleRequestDetailInfo(id)
			await this.confirmSingIn(id)
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
