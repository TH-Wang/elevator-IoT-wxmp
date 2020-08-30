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
		      <view class="cpmts">电梯总数 2104</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum2 numbvoc"></view>
		      <view class="cpmts">联网数 2104</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum3 numbvoc"></view>
		      <view class="cpmts">在线数 2104</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum4 numbvoc"></view>
		      <view class="cpmts">离线数 2104</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum5 numbvoc"></view>
		      <view class="cpmts">检修数 2104</view>
		    </view>
		    <view class="contlists">
		      <view class="colnum6 numbvoc"></view>
		      <view class="cpmts">故障数 2104</view>
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
				covers: '',
				addressList:'',
				addxiaoqu:'',
			}
		},
		onLoad() {
			let that = this;
			that.areaList = AREA;
			this.getadd()
		},
		methods: {
			recordName(e){
				this.addxiaoqu = e.detail.value; 
				this.searchbox(this.cityda,e.detail.value,this.addText)
			},
			searchbox(city,vaill_name,province){
				request.post('/gis_map',{
					city:city,
					vaill_name:vaill_name,
					province:province,
				}).then((res)=>{
					console(res)
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
						this.covers= [{
						  id: 0,
						  latitude: data.latitude,
						  longitude: data.longitude,
						  iconPath: "../../static/image/yfm/dwbox.png",
						  width: 20,  //图片显示宽度
						  height: 20,  //图片显示高度
						  callout: { 
						    content: " 这里是小区名字圣诞节规划是  \n 维修:10  维修:10  维修:10",
						    color: "#000000",
						    fontSize: "12", 
						    borderRadius: "5",
						    bgColor: "#ffffff",
						    padding: "5",
						    display:"ALWAYS"
						    }
						}]
					
					//     var point = new plus.maps.Point(res.longitude, res.latitude);
					// 	plus.maps.Map.reverseGeocode(
					// 		point,
					// 		{},
					// 		function(event) {
					// 			console.log(event)
					// 			var address = event.address; // 转换后的地理位置
					// 			var point = event.coord; // 转换后的坐标信息
					// 			var coordType = event.coordType; // 转换后的坐标系类型
					// 			console.log(address, 'address');
					// 			var reg = /.+?(省|市|自治区|自治州|县|区)/g;
								
					// 			console.log(address.match(reg));
					// 			_this.addressList=address.match(reg).toString().split(",");
					// 			 _this.address= _this.addressList[1];
					// 			console.log(_this.addressList[0]);
					// 			console.log(_this.addressList[1]);
					// 			console.log(_this.addressList[2]);
								
					// 		},
					// 		function(e) {}
					// 	);
					
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
