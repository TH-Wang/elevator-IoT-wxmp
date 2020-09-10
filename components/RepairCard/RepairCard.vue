<template>
	<view class="container" :style="containerStyle" @click="$emit('click')">
		<!-- 头部 -->
		<view class="header">
			<view v-if="hasTag" :class="'header-tag ' + 'tag-' + type">{{getHeaderTagText()}}</view>
			<text class="title ellipsis">{{record.ele_name || record.name}}</text>
			<text class="time">{{timeText()}}</text>
		</view>
		
		<!-- 维保 -->
		<view v-if="type == 'maint'" class="detail ellipsis">
			电梯编码: {{record.elevator_number || record.unmber}}
		</view>
		<!-- 急修 -->
		<view v-else-if="type == 'repair'" class="detail ellipsis">
			<text>{{record.fault_code || record.e_code}}</text>
			<text class="space-point">·</text>
			<text class="ellipsis">{{record.fault_syn}}</text>
		</view>
		
		<!-- 底部 -->
		<view class="footer">
			<text class="address ellipsis">{{getAddress()}}</text>
			<view v-if="hasButton">
				<view v-if="type == 'repair'" :class="repairBtnClass">{{getRepairBtnText()}}</view>
				<view v-else-if="type == 'maint'" :class="maintBtnClass">{{getMaintBtnText()}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import formatDate from '../../utils/formatDate.js'
	
	export default {
		props: {
			record: {
				type: Object,
				default: ()=>({})
			},
			background: {
				type: String,
				default: 'rgba(65, 144, 245, .05)'
			},
			hasTag: Boolean,
			type: String,
			hasButton: Boolean,
			detailAddress: {
				type: Boolean,
				default: false
			}
		},
		data: () => ({
			repairBtnClass: '',
			maintBtnClass: ''
		}),
		computed: {
			containerStyle() {
				return 'background-color:' + (this.type=='repair'?'rgba(65,144,245,.05)':'rgba(253,144,38,.05)')
			}
		},
		methods: {
			timeText() {
				if(this.type == 'repair') {
					var time = this.record.fault_start_time
					if(typeof time == 'number') {
						return formatDate('YYYY-mm-dd', new Date(time))
					} else {
						return time
					}
				}
				else if(this.type == 'maint') {
					var time = this.record.maint_time
					if(typeof time == 'number') {
						return formatDate('YYYY-mm-dd', new Date(time))
					} else {
						return time
					}
				}
			},
			getRepairBtnText() {
				switch(this.record.repair_type) {
					case 0: return '待审核'
					case 1: return '待接警';
					case 2: return '待处理';
					case 3: return '进行中';
					case 4: return '维修完成';
					case 5: return '误报确认';
					case 6: return '自动修复';
					default: return '维修完成';
				}
			},
			getMaintBtnText() {
				switch(this.record.is_maintain) {
					case 1: return '待处理';
					case 2: return '已完成';
					case 3: return '进行中';
					case 4: return '逾期签到';
					default: return '已完成';
				}
			},
			getHeaderTagText() {
				switch(this.type) {
					case 'repair': return '急修';
					case 'maint': return '维保';
					case 'prompt': return '到期';
					case 'answer': return '反应';
					default: return '提示';
				}
			},
			getAddress() {
				if(this.detailAddress) {
					var { p_name, c_name, a_name, address } = this.record
					return `${p_name || ''}${c_name || ''}${a_name || ''}${address || ''}`
				} else {
					return this.record.address || ''
				}
			},
			computeButtonClass() {
				if(this.type == 'repair'){
					var typeId = this.record.repair_type
					idx = (typeId > 0 && typeId < 4) ? typeId : 4
					this.repairBtnClass = 'type-button ' + 'button-' + idx
				}
				else if(this.type == 'maint') {
					// 默认为已完成状态
					var idx = 4
					switch(this.record.is_maintain) {
						case 1: idx = 2;break;
						case 2: idx = 4;break;
						case 3: idx = 3;break;
						default: idx = 4
					}
					this.maintBtnClass = 'type-button ' + 'button-' + idx
				}
			}
		},
		mounted() {
			this.computeButtonClass()
		},
		watch: {
			record: function() {
				this.computeButtonClass()
			}
		}
	}
</script>

<style scoped>
	/* 省略号 */
	.ellipsis{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}
	
	.container{
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 4px;
	}
	
	.header, .footer{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.header-tag{
		margin-right: 10rpx;
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 22rpx;
		color: #FFFFFF;
		border-radius: 6rpx;
		flex-shrink: 0;
	}
	.time{
		flex-shrink: 0;
	}
	
	.detail{
		margin: 20rpx 0;
		display: flex;
		align-items: center;
	}
	
	.title{
		width: 78%;
		color: #000000;
		font-size: 28rpx;
		flex: 1;
	}
	
	.time, .type-button{
		width: 22%;
		font-size: 22rpx;
		color: #999999;
	}
	
	.space-point{
		margin: 0 10rpx;
	}
	
	.detail, .address{
		color: #333333;
		font-size: 24rpx;
	}
	
	.address{
		width: 78%;
	}
	
	.type-button{
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
	}
	/* 按钮 */
	.button-1{background-color: #ff4d4d; color: #FFFFFF}
	.button-2{background-color: #4190F5; color: #FFFFFF}
	.button-3{background-color: #FD9026; color: #FFFFFF}
	.button-4{background-color: #EEEEEE; color: #999999}
	
	/* 标签 */
	.tag-repair{background-color: #4190F5;}
	.tag-maint{background-color: #FD9026;}
	.tag-prompt{background-color: #FD9026;}
	.tag-answer{background-color: #4190F5;}
</style>
