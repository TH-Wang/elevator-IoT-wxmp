<template>
	<view>
		<van-index-bar>
		  <view v-for="(item,index) of citylistdata">
			<van-index-anchor index="A">标题1</van-index-anchor>
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		    <van-cell title="文本" />
		  </view>
		
		 
		</van-index-bar>
	</view>
</template>

<script>
	import request from '@/service/request.js'
	export default {
		
		data() {
			return{
				citylistdata:"",
			}
			
		},
		onLoad(){
			let that = this;
			this.datalist()
		},
		methods: {
			datalist(){
				request.post('/region/city',{
					province_id:''
				}).then((res) =>{
					console.log(res)
					// this.data
				})
			},
		}
			
	}
</script>

<style>
	.van-index-anchor{
		background: #f5f5f5 !important;
	}
</style>
