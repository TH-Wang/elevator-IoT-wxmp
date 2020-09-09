<template>
	<view class="main">
		<!-- 搜索框 -->
		<Search button />
		
		<!-- 分类导航栏 -->
		<Tabs
			:tabs="tabs"
			:active="active"
			@switch="handleSwitchTab"
		/>
		
		<!-- 列表 -->
		<swiper
			:current="active"
			class="page-list-container"
			:duration="300"
			@change="handleSwiperChange"
		>
			<swiper-item
				class="swiper-item"
				v-for="item in maintType"
				:key="item.code"
			>
				<scroll-view
					scroll-y="true"
					style="height: 100%;"
					lower-threshold="100"
					@scrolltolower="handleAddData(item.code)"
				>
					<!-- 空数据 -->
					<Empty v-if="dataSource[item.key].dataSource.length == 0" :title="'暂无' + item.label + '工单'" />
					<!-- 维保工单列表 -->
					<RepairCard
						v-for="record in dataSource[item.key].dataSource"
						:key="record.id"
						:record="record"
						hasButton
						type="maint"
						@click="handleLinkDetail(record.id)"
					/>
					<view style="height: 30rpx;"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import TabbarPage from '../../components/TabbarPage/TabbarPage.vue'
	import Tabs from '../../components/Tabs/Tabs.vue'
	import Search from '../../components/Search/Search.vue'
	import RepairCard from '../../components/RepairCard/RepairCard.vue'
	import Empty from '../../components/Empty/Empty.vue'
	import repairData from '../../data/repair.js'
	import request from '../../service/request.js'
	
	export default {
		components:{
			TabbarPage,
			Tabs,
			Search,
			RepairCard,
			Empty
		},
		data() {
			return {
				active: 0,
				maintType: [
					{
						code: 1,
						label: '待处理',
						key: 'pending'
					}, 
					{
						code: 3,
						label: '进行中',
						key: 'doing'
					}, {
						code: 2,
						label: '已完成',
						key: 'finish'
					}, {
						code: 0,
						label: '全部',
						key: 'all'
					}
				],
			}
		},
		computed: {
			tabs() {
				return this.maintType.map(i=>i.label)
			},
			dataSource() {
				return this.$store.state.maint
			},
			activeType() {
				return this.maintType[this.active].code
			}
		},
		methods: {
			handleSwitchTab(idx) {
				this.active = idx
			},
			handleSwiperChange(e) {
				this.active = e.detail.current
			},
			handleAddData: function(type) {
				this.$store.dispatch('requestMaintList', { type })
			},
			handleLinkDetail(id) {
				uni.navigateTo({
					url: '/pages/workdel/workdel?id=' + id
				})
			}
		},
		watch: {
			active: function(newValue, oldValue) {
				var key = this.maintType[newValue].key
				if(this.$store.state.maint[key].dataSource.length == 0) {
					this.handleAddData(this.activeType)
				}
			}
		},
		onLoad: function(){
			this.handleAddData(this.activeType)
		},
		onPullDownRefresh() {
			this.active = 0
			this.handleAddData(this.activeType)
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style scoped>
	.page-list-container{
		height: calc(100vh - 200rpx);
		padding-top: 1px;
		box-sizing: border-box;
	}
	.swiper-item{
		height: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
</style>
