<template>
	<view class="container">
		
		<view class="picker-container">
			<!-- 故障属性选择器 -->
			<view class="form-item">
				<view class="label">选择电梯</view>
				<view class="picker" @click="modalVisible = true">
					<text class="pickered-text">{{selectedLift}}</text>
					<image class="picker-icon" src="../../static/icon/right.png" />
				</view>
			</view>
			
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
		
		<transition name="fade">
			<view
				class="modal-container"
				v-if="modalVisible"
				@click="handleClose"
				id="box"
			>
				<view class="modal-card" id="card">
					<!-- 头部搜索 -->
					<view class="header">
						<view class="title">搜索电梯</view>
						<ModalSearch class="modal-search" @search="handleSearchLift" />
					</view>
					<!-- 列表 -->
					<view class="eva-list">
						<Empty
							v-if="liftList.length === 0"
							:title="loadingText"
							style="font-size: 24rpx;"
						/>
						
						<view
							v-else
							v-for="lift in liftList"
							:key="lift.elevator_id"
							:class="'eva-item ' + (liftId === lift.elevator_id ? 'eva-item-active' : '')"
							@click="handleSelectLift(lift.elevator_id)"
						>
							<view class="eva-name">
								<text>{{lift.name}}</text>
								<image
									class="selected-icon"
									v-show="liftId === lift.elevator_id"
									src="../../static/icon/feedback/success.png"
								/>
							</view>
							<view class="eva-code">编号：{{lift.elevator_number}}</view>
							<view class="eva-address">地址：{{lift.address}}</view>
						</view>
					</view>
				
					<!-- 确认按钮 -->
					<view class="confirm-button" @click="modalVisible = false">确认</view>
				</view>
			</view>
		</transition> 
	</view>
</template>

<script>
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import ModalSearch from '../../components/ModalSearch/ModalSearch.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import request from '../../service/request.js'
	
	export default {
		components: {
			CommonButton,
			ModalSearch,
			Empty
		},
		data: () => ({
			loadingText: '可通过电梯编码、名称、地址进行搜索',
			liftList: [],
			liftId: null,
			modalVisible: false,
			propRange: [],
			porpPickerIndex: 0,
			safeRange: ['一级', '二级', '三级', '四级', '五级'],
			safePickerIndex: 0,
			trappedRange: ['是', '否'],
			trappedPickerIndex: 0,
			describe: ''
		}),
		computed: {
			selectedLift() {
				return this.liftId ? this.liftList.find(i=>i.elevator_id==this.liftId).name : '请选择'
			}
		},
		methods: {
			// 搜索电梯
			async handleSearchLift(value) {
				this.loadingText = '搜索中...'
				var res = await request.post('/lift/list_info', {
					limit: 100,
					page: 1,
					lift_name: value
				})
				this.liftList = res.data
				this.loadingText = '可通过电梯编码、名称、地址进行搜索'
			},
			// 选择电梯
			handleSelectLift(id) {
				this.liftId = id
			},
			// 关闭电梯搜索弹窗
			handleClose(e) {
				if(e.target.id === 'box') this.modalVisible =  false
			},
			// 选择故障属性
			handlePropPickerChange(e) {
				this.porpPickerIndex = e.target.value
			},
			// 选择安全级别
			handleSafePickerChange(e) {
				this.safePickerIndex = e.target.value
			},
			// 选择是否困人
			handleTrappedPickerChange(e) {
				this.trappedPickerIndex = e.target.value
			},
			// 提交
			async handleSubmit() {
				var _this_ = this
				if(!this.liftId){
					uni.showModal({
						showCancel: false,
						title: '请选择故障电梯'
					})
					return
				}
				var data = {
					ele_id: _this_.liftId,
					security_level: _this_.safePickerIndex,
					fault_attr: _this_.propRange[_this_.porpPickerIndex],
					is_tiring: _this_.trappedPickerIndex,
					describe: _this_.describe
				}
				console.log(data)
				
				// 发送请求
				var res = await request.post('/maint/fault_report', data)
				if(res.code == 1){
					uni.showToast({
						title: '上报成功！',
						icon: 'success',
						mask: true,
						success() {
							setTimeout(()=>{
								_this_.$emit('success')
							}, 1000)
						}
					})
				}
			}
		},
		mounted: async function() {
			console.log(this.modalVisible)
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

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
	
	/* 模态框--搜索电梯 */
	.modal-container{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
	}
	
	.modal-card{
		width: 600rpx;
		height: 60vh;
		border-radius: 10rpx;
		background-color: #F9F9F9;
		position: absolute;
		top: 10%;
	}
	
	.header{
		height: 160rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	
	.modal-search{
		width: 100%;
	}
	
	.title{
		font-size: 30rpx;
		color: #000000;
	}
	
	.eva-list{
		height: calc(60vh - 180rpx);
		padding: 1px 0 30rpx 0;
		box-sizing: border-box;
		overflow-y: scroll;
		background-color: #FFFFFF;
	}
	
	.eva-item{
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx 25rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		background-color: rgba(65, 144, 245, 0.05);
	}
	.eva-item-active{
		background-color: rgba(65, 144, 245, 0.1);
		border: solid 1px rgba(65, 144, 245, 1);
	}
	
	.eva-name{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #000000;
		margin-bottom: 20rpx;
		font-weight: bold;
	}
	.selected-icon{
		width: 32rpx;
		height: 32rpx;
	}
	.eva-code{
		margin-bottom: 10rpx;
	}
	.eva-code, .eva-address{
		font-size: 23rpx;
		color: #666666;
	}
	
	.confirm-button{
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		background-color: #4190F5;
	}
</style>
