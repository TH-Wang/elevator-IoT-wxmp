<template>
	<view>
		<view class="headboxs">
		
		  <view class="headtopbox">
		    <view class="headlet">
		      <image src="../../static/image/yfm/search.png"></image>
		      <input type="text" placeholder="输入电梯名字"></input>
		    </view>
		    <view class="dwboxs">
		      <view class="addstxt">重庆</view>
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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 39.909,
				longitude: 116.39742,
				markers:'' ,
				covers: [{
              id: 0,
              iconPath: "../../static/image/yfm/dwbox.png",
              latitude: 39.909,
              longitude:116.39742 ,
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
			}
		},
		methods: {
			
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
  width: 570rpx;
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
