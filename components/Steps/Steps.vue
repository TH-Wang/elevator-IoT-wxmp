<template>
	<view class="container">
		<view class="bar-container">
			<view class="point-container">
				<view
					v-for="(step, index) in steps"
					:key="step.type"
					:class="index <= active ? 'point-active' : 'point'"
				/>
			</view>
			<view class="line-container">
				<view
					v-for="(line, idx) in lines"
					:class="idx <= active ? 'line-active' : 'line'"
					:style="'width: ' + (100 / steps.length / (idx === 0 ? 2 : 1)) + '%'"
					:key="idx"
				/>
				<view
					:class="active == steps.length-1 ? 'line-active' : 'line'"
					:style="'width: ' + (100 / steps.length / 2) + '%'"
				/>
			</view>
		</view>
		
		<view class="info-container">
			<view
				v-for="(step, idx) in steps"
				:key="step.type"
				class="info-item"
			>
				<view :class="idx <= active ? 'title-active' : 'title'">{{step.title}}</view>
				<view class="time">{{idx <= active ? step.time : '&nbsp;'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: Number,
				default: 2
			}
		},
		data: () => ({
			number: 1,
			steps: [
				{
					type: 1,
					title: '待接警',
					time: '4-11 15:11:23'
				},
				{
					type: 2,
					title: '待处理',
					time: '4-11 15:11:23'
				},
				{
					type: 3,
					title: '已到达',
					time: '4-11 15:11:23'
				},
				{
					type: 4,
					title: '已完成'
				}
			]
		}),
		computed: {
			active() {
				return this.steps.findIndex(item => item.type === this.type)
			},
			lines() {
				return [...this.steps.map((e,i)=>i)]
			}
		},
		methods: {
			lineStyle(idx) {
				if(idx === 0) {
					return 'width: ' + (100 / this.steps.length / 2) + '%'
				}
				else return 'width: ' + (100 / this.steps.length) + '%'
			}
		}
	}
</script>

<style scoped>
	.container{
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	
	.bar-container{
		height: 14rpx;
		position: relative;
	}
	
	.point-container{
		width: 100%;
		height: 14rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}
	.point{
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #CCCCCC;
	}
	.point-active{
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #4190F5;
	}
	
	.line-container{
		width: 100%;
		height: 14rpx;
		display: flex;
		align-items: center;
	}
	.line{
		height: 1px;
		background-color: #CCCCCC;
	}
	.line-active{
		height: 1px;
		background-color: #4190F5;
	}
	
	.info-container{
		display: flex;
		align-items: center;
		margin-top: 14rpx;
	}
	.info-item{
		flex: 1;
	}
	.title{
		font-size: 24rpx;
		color: #999999;
		text-align: center;
	}
	.title-active{
		font-size: 24rpx;
		color: #000000;
		text-align: center;
	}
	.time{
		margin-top: 6rpx;
		font-size: 20rpx;
		color: #999999;
		text-align: center;
	}
</style>

