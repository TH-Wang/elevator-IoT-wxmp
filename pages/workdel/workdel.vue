<template>
	<view class="cptbox">
		<Steps :steps="steps" :type="dataSource.basis.is_maintain" />

		<!-- 基本信息 / 签到 -->
		<view class="qdcont">
			<view class="qdlist">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/people.png"></image>
					<text>维保人员：{{dataSource.basis.user_name}}</text>
				</view>
				<view v-if="dataSource.basis.is_authority == 1">
					<view class="sign-text" v-if="signed">
						<image src="../../static/icon/feedback/success.png" />已签到
					</view>
					<view class="sign-btn" v-else @click="handleSignIn">签到</view>
				</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/time.png"></image>
					<text>维保时间：{{dataSource.basis.maint_end_time}}</text>
				</view>
			</view>
			<view class="qdlist topmar">
				<view class="qdlettxt">
					<image src="../../static/icon/repair/address.png"></image>
					<text>所在小区：{{dataSource.ele.village_name}}</text>
				</view>
			</view>
		</view>

		<!-- 维保项目 -->
		<view class="wbcont">
			<view class="headcont">
				<view class="wbnum">维保项目</view>
				<view class="rigtwbnum">（{{projectTotal}}）</view>
			</view>
			<view class="projectList">
				<view class="wbnavcont"
					v-for="item in projectList"
					:key="item.id"
					@click="handleLinkProjectDetail(item.id)"
				>
					<view class="wbname">{{item.name}}</view>
					<view class="wbrightnum">
						<view class="znum">总数<text class="count-text texcol1">{{item.count}}</text></view>/
						<view class="znum">合格<text class="count-text texcol2">{{item.qualified}}</text></view>/
						<view class="znum">不合格<text class="count-text texcol3">{{item.unqualified}}</text></view>
						<van-icon name="arrow" />
					</view>
				</view>
			</view>
		</view>
		
		<!-- 提交按钮 -->
		<view v-if="dataSource.basis.is_authority == 1">
			<CommonButton
				v-if="dataSource.basis.is_maintain_tan == 0 && signed"
				text="提交"
				@click="handleSubmitOrder"
			/>
			<CommonButton
				v-else-if="dataSource.basis.is_maintain_tan == 0 && !signed"
				text="请先完成签到"
				disabled
			/>
			<CommonButton
				v-else-if="dataSource.basis.is_maintain_tan == 1"
				text="已提交"
				disabled
			/>
		</view>

		<!-- 签到成功弹窗 -->
		<SignInModal :visible="signInSuccess" @close="signInSuccess = false" />
		
		<!-- 维保人员签字板 -->
		<SignBoardModal
			title="维保人员签字"
			:visible="signModalVisible.maint"
			@close="signModalVisible.maint = false"
			@save="handleMaintSignFile"
		/>
		
		<!-- 安全人员签字板 -->
		<SignBoardModal
			title="安全人员签字"
			:visible="signModalVisible.safe"
			:showCancel="true"
			@close="signModalVisible.safe = false"
			@save="handleSafeSignFile"
			@cancel="handleSafeCancel"
		/>
		
		<!-- 物业人员签字板 -->
		<SignBoardModal
			title="物业人员签字"
			:visible="signModalVisible.property"
			:showCancel="true"
			@close="signModalVisible.property = false"
			@save="handleProperSignFile"
			@cancel="handleProperCancel"
		/>
	</view>
</template>

<script>
	var x = 20;
	var y = 20;
	import Steps from '../../components/Steps/Steps.vue'
	import request from '@/service/request.js'
	import CommonButton from '../../components/CommonButton/CommonButton.vue'
	import SignInModal from '../../components/SignInModal/SignInModal.vue'
	import SignBoardModal from '../../components/SignBoardModal/SignBoardModal.vue'
	import app from '../../App.vue'

	export default {
		components: {
			Steps,
			CommonButton,
			SignInModal,
			SignBoardModal
		},
		data: () => ({
			orderId: null,
			signInSuccess: false,
			signed: false,
			dataSource: {},
			steps: [
				{
					type: 1,
					title: '待处理',
					time: ''
				},
				{
					type: 3,
					title: '进行中',
					time: ''
				},
				{
					type: 2,
					title: '已完成',
					time: ''
				}
			],
			projectList: [],
			projectTotal: 0,
			signModalVisible: {
				maint: false,
				safe: false,
				property: false
			}
		}),
		methods: {
			// 请求详情信息
			handleRequestDetailInfo: async function(id) {
				var res = await request.post('/maint/maint_one', {
					id
				})
				this.dataSource = res.data
				// 更新时间
				this.steps = this.steps.map(item => {
					var t = res.data.log_time.find(i => i.type == item.title)
					if (t) item.time = t.time
					return item
				})
			},
			// 判断是否签到
			confirmSingIn: async function() {
				var _this_ = this
				var res = await request.post('/maint/verify_location', {
					id: _this_.orderId,
				})
				this.signed = Boolean(res.data.is_qan)
			},
			// 签到
			handleSignIn: async function() {
				var _this_ = this
				var res = await request.post('/maint/sign_in', {
					id: _this_.orderId,
					is_qan: 1
				})
				if (res.code == 1) {
					this.signInSuccess = true
					this.signed = true
					await this.handleRequestDetailInfo(this.orderId)
					// 更新列表的工单状态
					this.$store.commit('updateMaintState', {
						id: _this_.orderId,
						oldType: 1,
						newType: 3
					})
					// 更新待办事项的工单状态
					this.$store.commit('todoListUpdateMaint', {
						id: _this_.orderId,
						type: 3
					})
				} else {
					uni.showToast({
						title: '签到失败，请稍后再试！',
						icon: 'none'
					})
				}
			},
			// 维保项目列表
			requestProjectList: async function(id) {
				var res = await request.post('/maint/main_xm', {maint_id: id})
				console.log(res.data)
				this.projectList = res.data
				this.projectTotal = res.data.reduce((prev, item) => prev + item.count, 0)
			},
			// 跳转到对应的二级菜单
			handleLinkProjectDetail(id) {
				var _this_ = this
				var auth = _this_.dataSource.basis.is_authority
				uni.navigateTo({
					url: '../workOrder/workOrder?id=' + id + '&maint_id=' + _this_.orderId + '&auth=' + auth
				})
			},
			// 提交工单
			handleSubmitOrder: async function() {
				var _this_ = this
				var res = await request.post('/maint/main_por_vali', {
					bill_id: _this_.orderId,
					type: 1
				})
				if(res.code == 1) {
					// 维保人员签字
					this.signModalVisible.maint = true
				} else {
					uni.showToast({
						title: '提交失败，请检查是否完成所有项目',
						icon: 'none'
					})
				}
			},
			// 提交签字
			handleRequestSignIn(filePath, type) {
				var _this_ = this
				return new Promise((resolve, reject) => {
					request.upload({
						url: '/maint/signature',
						name: 'image',
						filePath,
						data: { id: _this_.orderId, type, remark: '' }
					})
					.then(res => {
						if(res.code == 1) {
							uni.showToast({ title: '签字成功', icon: 'success' })
							resolve(res)
						} else {
							uni.showToast({ title: '签字失败，请稍后再试' })
							reject(err)
						}
					})
					.catch(err => {
						uni.showToast({ title: '签字失败，请稍后再试' })
						reject(err)
					})
				})
				
			},
			// 维保人员签字
			handleMaintSignFile: async function(filePath) {
				await this.handleRequestSignIn(filePath, 2)
				this.signModalVisible.maint = false
				this.signModalVisible.safe = true
			},
			// 安全人员签字
			handleSafeSignFile: async function(filePath) {
				await this.handleRequestSignIn(filePath, 1)
				this.signModalVisible.safe = false
				this.signModalVisible.property = true
			},
			// 物业人员签字
			handleProperSignFile: async function(filePath) {
				var _this_ = this
				await this.handleRequestSignIn(filePath, 3)
				this.signModalVisible.property = false
				// 刷新工单数据
				await this.handleRequestDetailInfo(this.orderId)
				// 更新列表的工单状态
				this.$store.commit('updateMaintState', {
					id: _this_.orderId,
					oldType: 3,
					newType: 2
				})
				// 更新待办事项的工单状态
				this.$store.commit('todoListUpdateMaint', {
					id: _this_.orderId,
					type: 2
				})
			},
			// 安全人员取消签字
			handleSafeCancel() {},
			// 物业人员取消签字
			handleProperCancel() {},
		},
		onLoad: async function(option) {
			var { id } = option
			this.orderId = id
			await this.handleRequestDetailInfo(id)
			await this.confirmSingIn(id)
			await this.requestProjectList(id)
		}
	}
</script>

<style>
	.closebtns {
		font-size: 50rpx;
		right: -14rpx;
		top: -14rpx;
		color: #4190F5;
		position: absolute;
		background: #ffffff;
		border-radius: 50%;

	}

	.van-popup {
		border-radius: 10rpx;
		overflow-y: inherit !important;
	}

	.signature {
		position: fixed;
		top: 10px;
		left: 2%;
		z-index: 999;
		width: 96%;
	}

	.container {
		padding: 20rpx 0 120rpx 0;
		box-sizing: border-box;
	}

	.title {
		height: 50upx;
		line-height: 50upx;
		font-size: 16px;
	}

	.mycanvas {
		width: 100%;
		height: 100%;
	}

	.footer {
		font-size: 14px;
		height: 150upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.right {
		position: absolute;
		background: rgba(65, 144, 245, 0.2);
		right: 20rpx;
		bottom: 20rpx;
		width: 120rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #4190F5;
		font-size: 22rpx;
	}

	.van-fade-enter-active {
		border-radius: 10rpx;
	}

	.qzban {
		width: 100%;
		height: 274rpx;
		background: rgba(0, 136, 255, 0.05);
		border-radius: 10rpx;
		margin-top: 30rpx;
		position: relative;
	}

	.btncontqr {
		width: 300rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		margin: 40rpx auto;
		background: #0088FF;
	}

	.bzcont {
		font-size: 24rpx;
		width: 100%;
		height: 80rpx;
		border: 1rpx solid rgba(238, 238, 238, 1);
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	.qrbtnqz {
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
	}

	.wrapper {
		position: relative;
		width: 600rpx;
		height: 652rpx;
		background: #ffffff;
		border-radius: 10rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}

	.tjbtns {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 500rpx;
		height: 96rpx;
		color: #ffffff;
		background: #0088FF;
		font-size: 36rpx;
		margin: 80rpx auto;
		border-radius: 10rpx;
	}
	
	.wbname{
		font-size: 28rpx;
	}
	.count-text{
		margin-left: 4rpx;
	}
	.texcol1 {
		color: #4190F5;
	}

	.texcol2 {
		color: #52C28E;
	}

	.texcol3 {
		color: #FF3B30;
	}

	.znum {
		color: #000000;
		margin: 0 20rpx;
	}

	.wbrightnum {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #CCCCCC;
	}

	.projectList {
		padding: 0 30rpx;

	}

	.wbnavcont:last-child {
		border-bottom: none !important;
	}

	.wbnavcont {
		border-bottom: 1rpx solid #EEEEEE;
		height: 86rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.wbnum {
		font-size: 28rpx;
	}

	.rigtwbnum {
		font-size: 24rpx;
		color: #4190F5;
	}

	.headcont {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.wbcont {
		background: #ffffff;
		margin-top: 20rpx;
	}

	.topmar {
		margin-top: 5rpx;
	}

	.sign-btn {
		width: 120rpx;
		height: 50rpx;
		background-color: #4190F5;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #ffffff;
	}

	.sign-text {
		color: #4190F5;
		font-size: 22rpx;
		display: flex;
		align-items: center;
	}
	.sign-text image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
	}

	.qdlettxt text {
		margin-left: 20rpx;
		font-size: 24rpx;
	}

	.qdlettxt {
		display: flex;
		align-items: center;
	}

	.qdlettxt image {
		width: 31rpx;
		height: 31rpx;
	}

	.qdlist {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50rpx;
	}

	.qdcont {
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		background: #ffffff;
		height: 200rpx;
		box-sizing: border-box;
	}

	.buzcont {
		padding: 0 30rpx;
		height: 166rpx;
		background: #ffffff;

	}

	.van-step__title {
		/* position: absolute; */
		/* top: 50rpx; */
		text-align: center;
	}
</style>
