<template>
	<view class="container">
		
		<view class="picker-container">
			<!-- 故障属性选择器 -->
			<view class="form-item">
				<view class="label">故障属性</view>
				<picker class="picker" :value="porpPickerIndex" :range="propRange" @change="handlePropPickerChange">
					<text class="pickered-text">{{propRange[porpPickerIndex]}}</text>
					<image class="picker-icon" src="../../static/icon/right.png" />
				</picker>
			</view>
			
			<!-- 安全级别选择器 -->
			<view class="form-item">
				<view class="label">安全级别</view>
				<picker class="picker" :value="safePickerIndex" :range="safeRange" @change="handleSafePickerChange">
					<text class="pickered-text">{{safeRange[safePickerIndex]}}</text>
					<image class="picker-icon" src="../../static/icon/right.png" />
				</picker>
			</view>
			
			<!-- 是否困人选择器 -->
			<view class="form-item">
				<view class="label">是否困人</view>
				<picker class="picker" :value="trappedPickerIndex" :range="trappedRange" @change="handleTrappedPickerChange">
					<text class="pickered-text">{{trappedRange[trappedPickerIndex]}}</text>
					<image class="picker-icon" src="../../static/icon/right.png" />
				</picker>
			</view>
		</view>
		
		<view class="text-container">
			<view class="form-item">
				<view class="label">故障描述</view>
			</view>
			<textarea class="textarea" v-model="describe"></textarea>
		</view>
		
		<CommonButton text="确认提交" @click="handleSubmit" />
	</view>
</template>

<script>
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			CommonButton
		},
		data: () => ({
			propRange: [],
			porpPickerIndex: 0,
			safeRange: ['一级', '二级', '三级', '四级', '五级'],
			safePickerIndex: 0,
			trappedRange: ['是', '否'],
			trappedPickerIndex: 0,
			describe: ''
		}),
		methods: {
			handlePropPickerChange(e) {
				this.porpPickerIndex = e.target.value
			},
			handleSafePickerChange(e) {
				this.safePickerIndex = e.target.value
			},
			handleTrappedPickerChange(e) {
				this.trappedPickerIndex = e.target.value
			},
			async handleSubmit() {
				var _this_ = this
				var data = {
					security_level: _this_.safePickerIndex,
					attr: _this_.propRange[_this_.porpPickerIndex],
					is_tiring: _this_.security_level,
					describe: _this_.describe
				}
				// 发送请求
				var res = await request.post('/maint/fault_report', data)
				console.log(res)
			}
		},
		mounted: async function() {
			try{
				var res = await request.post('/maint/fault_attr')
				console.log(res)
				this.propRange = res.data.map(item => item.name)
			}catch(err){
				console.log(err)
			}
		}
	}
</script>

<style scoped>
	.picker-container, .text-container{
		width: 100%;
		padding: 0 30rpx;
		margin-top: 24rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.text-container{
		padding-bottom: 30rpx;
	}
	
	.form-item{
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.form-item + .form-item{
		border-top: solid 1px #F7F7F7;
	}
	
	.label, .pickered-text{
		font-size: 24rpx;
		color: #000000;
	}
	
	.form-element{
		display: flex;
		align-items: center;
	}
	
	.picker{
		flex: 1;
		height: 90rpx;
		line-height: 90rpx;
		text-align: right;
	}
	
	.picker-icon{
		width: 20rpx;
		height: 20rpx;
		margin-left: 20rpx;
		transform: rotateZ(90deg);
		transform-origin: center;
	}
	
	.textarea{
		width: 100%;
		height: 274rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border: solid 1px #EEEEEE;
		border-radius: 3px;
	}
</style>
