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
				
				<!-- 配件更换选择器 -->
				<view class="form-item">
					<view class="label">配件更换</view>
					<picker class="picker" :value="safePickerIndex" :range="safeRange" @change="handleSafePickerChange">
						<text class="pickered-text">{{safeRange[safePickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
				
				<!-- 急修建议选择器 -->
				<view class="form-item">
					<view class="label">急修建议</view>
					<picker class="picker" :value="trappedPickerIndex" :range="trappedRange" @change="handleTrappedPickerChange">
						<text class="pickered-text">{{trappedRange[trappedPickerIndex]}}</text>
						<image class="picker-icon" src="../../static/icon/right.png" />
					</picker>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data: () => ({
			propRange: [],
			porpPickerIndex: 0,
			safeRange: ['一级', '二级', '三级', '四级', '五级'],
			safePickerIndex: 0,
			trappedRange: ['是', '否'],
			trappedPickerIndex: 0,
		}),
		computed: {
			
		},
		methods: {
			
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
</style>

