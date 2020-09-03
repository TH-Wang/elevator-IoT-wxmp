<template>
	<view>
		<view class="headboxs">
		
		  <view class="headtopbox">
		    <view class="headlet">
		      <image src="../../static/image/yfm/search.png"></image>
		      <input type="text" placeholder="输入电梯名字"  :value="addxiaoqu"   @input="recordName"></input>
		    </view>
		    <view class="dwboxs" @click="changeAddres()">
		      <view class="addstxt">{{ addText }}</view>
		      <image src="../../static/image/yfm/dwbox.png"></image>
		    </view>
		  </view>
		
		  <view class="listboxs">
		    <view class="contlists">
		      <view class="colnum1 numbvoc"></view>
		      <view class="cpmts">电梯总数 {{dtnum.normal}}</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum2 numbvoc"></view>
		      <view class="cpmts">联网数 {{dtnum.internet}}</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum3 numbvoc"></view>
		      <view class="cpmts">在线数 {{dtnum.line}}</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum4 numbvoc"></view>
		      <view class="cpmts">离线数 {{dtnum.online}}</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum5 numbvoc"></view>
		      <view class="cpmts">检修数 {{dtnum.maint}}</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum6 numbvoc"></view>
		      <view class="cpmts">故障数 {{dtnum.fault}}</view>
		    </view>
		  </view>
		</view>
		<map class="listcont"
		id="map" :longitude="longitude" :latitude=" latitude" :markers="covers" scale="15" 
		>
		</map>
        <van-popup
		  :show="addresShow"
		  position="bottom"
		  @close="onClose"
		>
		<van-area @confirm="isokAdd" @cancel="onClose" :area-list="areaList" />
		</van-popup>
	</view>
</template>

<script>
	import AREA from "@/utils/area.js"
	import request from '@/service/request.js'
	export default {
		data() {
			return {
				dtnum:"",//电梯数目
				xqShow: false,
				xqText: '全部地区',
				cityda:'重庆市',
				xqCode: 0,
				addText: '江北区',
				dqCode: 500107,
				addresShow: false,
				areaList: {},
				latitude: '',
				longitude: '',
				markers:'' ,
				covers: [],
				addressList:'',
				addxiaoqu:'',
			}
		},
		onLoad() {
			let that = this;
			that.areaList = AREA;
			this.getadd()
			this.tkcont()
		},
		methods: {
			recordName(e){
				this.addxiaoqu = e.detail.value; 
				this.searchbox(this.cityda,e.detail.value)
			},
			searchbox(province,vaill_name){
				var that=this
				request.post('/gis_map',{
					city:province,
					vaill_name:vaill_name,
				}).then((res)=>{
					console.log(res)
					var das=res.data
					console.log(das.length)
					if(das.length<=0){  return uni.showToast({  title: '暂无数据', duration: 1500,icon:'none'}); };
					
					
					that.latitude=das[0].latitude;
					that.longitude=das[0].longitude;
					for(var i=0;i<das.length;i++){
						that.covers.push({
							id:das[i].village_id,
							latitude:das[i].latitude,
							longitude:das[i].longitude,
							iconPath: "../../static/image/yfm/dwbox.png",
							width: 20,  //图片显示宽度
							height: 20,  //图片显示高度
							callout: {
							  content:  das[i].address+"  \n 总数:"+das[i].number+"  在线:"+das[i].offline_number+"  离线:"+das[i].online_number+"",
							  color: "#000000",
							  fontSize: "12", 
							  borderRadius: "5",
							  bgColor: "#ffffff",
							  padding: "5",
							  display:"ALWAYS"
							  }
						})
					}
					
				})
			},
			// 电梯数量统计
			tkcont(){
				request.post('/statistical/elevator',{
					
				}).then((res)=>{
					this.dtnum=res.data
				})
			},
			getadd(){
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success:data=>{
						console.log(data)
						this.latitude=data.latitude
						this.longitude=data.longitude
						// this.covers= []
					
					
					
					}
				})
			},
			changeAddres(){
				let that = this;
				that.addresShow = true;
			},
			isokAdd(e){
				console.log(e)
				let that = this;
				let value = e.target.values;
				let addText = value[2].name; //value[0].name+'/'+value[1].name+'/'+
				let dqCode = value[2].code;
				that.cityda=value[1].name;
				that.addText = addText;
				that.dqCode = dqCode;
				that.xqText= '全部地区',
				that.xqCode= 0,
				that.onClose();
				that.searchbox(this.cityda,this.addxiaoqu)
			},
			
			onClose(){
				let that = this;
				that.addresShow = false;
			},
			// listcitybtn(){
			// 	uni.navigateTo({
			// 		url:'../citylist/citylist'
			// 	})
			// },
		}
	}
</script>

<style>
/* pages/gisbox/gisbox.wxss */
.headboxs{
  background: white;
  height: 215rpx;
  width: 100%;
  padding: 20rpx 30rpx;
  border-top: 1rpx solid #F5F5F5;
  box-sizing: border-box;
}
.headtopbox{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70rpx;
}
.contlists{
  margin-top: 20rpx;

}
.headlet{
  display: flex;
  align-items: center;
  height: 70rpx;
}
.headlet{
  width: 500rpx;
  height: 70rpx;
  position: relative;
  display: flex;
  align-items: center;
}
.headlet image{
  width: 36rpx;
  height: 36rpx;
  position: absolute;
  left: 30rpx;
}
.headlet input{
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  border-radius: 50rpx;
  font-size: 24rpx;
  padding-left: 86rpx;
}
.dwboxs{
  display: flex;
  align-items: center;
}
.addstxt{
  font-size: 28rpx;
  color: #4190F5;
}
.dwboxs image{
  width: 34rpx;
  height: 34rpx;
  margin-left: 10rpx;
}
.colnum1{
  background: #4190F5;
}
.listboxs{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.contlists{
  display: flex;
  align-items: center;
  width: 33.33%;
}
.cpmts{
  font-size: 24rpx;
  margin-left: 10rpx;
}
.numbvoc{
  width: 20rpx;
  height: 20rpx;
  border-radius:50% ;
}
.colnum2{
  background: #52C28E;
}
.colnum3{
  background: #21CFCF;
}
.colnum4{
  background: #968EEC;
}
.colnum5{
  background: #FD9026;
}
.colnum6{
  background: #FF3B30;
}
.listcont{
  position: fixed;
  left: 0;
  top: 215rpx;
  width: 100%;
  height: 100%;
}
</style>
