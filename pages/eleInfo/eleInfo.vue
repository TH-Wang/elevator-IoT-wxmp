<template>
	<view class="ele-info" :class="isShow?'anme1':'anme2'">
		<!-- 电梯 -->
		<view class="ele-box">
			<image src="../../static/image/wxj/dt.png" mode=""></image>
			<view class="ele-box-num">15</view>
			<view class="room">
				<view class="room_1" :class="isShow?'':'room-an1'">
					<image src="../../static/image/wxj/2.png" mode=""></image>
				</view>
				<view class="room_2" :class="isShow?'':'room-an2'">
					<image src="../../static/image/wxj/1.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="ele-info-btn" @click="openTapBar()">
			<image src="../../static/image/wxj/more.png" mode=""></image>
		</view>
		<!-- 菜单栏 -->
		<view class="menu-bar" :class="isBar?'show':'none'">
			<!-- 菜单列表 -->
			<view class="menu-bar-list">
				<view class="menu-bar-list-li" :class="item.id == active?'bar_active':''" v-for="(item, index) in bar" :key="item.id"
				 @click="offTapBar(item.id)">{{ item.name }}
					<image v-if="item.isImg" :src="item.img" mode=""></image>
				</view>
			</view>
			<!-- 菜单详细 电梯状态 -->
			<view class="menu-bar-info" :class="active==1 && isShowVideo == false?'show':'none'">
				<view class="menu-bar-info-stuts">
					<view class="menu-bar-info-stuts-one">
						<view class="menu-bar-info-stuts-one-title">
							门锁状态：
						</view>
						<view class="menu-bar-info-stuts-one-iskg">
							<view class="menu-bar-info-stuts-one-iskg-k" :class="isKai?'textClore':''">
								<text class="dian" :class="isKai?'bgTextClor':''"></text> 开门
							</view>
							<view class="menu-bar-info-stuts-one-iskg-g" :class="isKai?'':'textClore'">
								<text class="dian" :class="isKai?'':'bgTextClor'"></text> 关门
							</view>
						</view>
					</view>
					<view class="menu-bar-info-stuts-list">
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
						<view class="menu-bar-info-stuts-list-li">
							<image src="../../static/icon/tabbar/maintain-active.png" mode=""></image> 自动
						</view>
					</view>
				</view>

				<view class="menu-bar-info-list">
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">上召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">下召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
					<view class="menu-bar-info-list-li">
						<view class="menu-bar-info-list-li-name">内召</view>
						<view class="menu-bar-info-list-li-bq">
							<text>5</text>
							<text>20</text>
							<text>15</text>
						</view>
					</view>
				</view>
				<view class="menu-bar-info-btn">
					<text class="menu-bar-info-btn-hj">呼梯</text>
					<text class="menu-bar-info-btn-jy" @click="jyTap">5G救援</text>
				</view>
			</view>
			<!-- 菜单二 电梯信息-->
			<view class="menu-bar-two" :class="active==2?'show':'none'">
				<view class="menu-bar-two-list">
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯名称</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯品牌</view>
						<view class="menu-bar-two-list-li-text">施密特</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯型号</view>
						<view class="menu-bar-two-list-li-text">三一</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯梯种</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯地址</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">使用单位</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯地址</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">维保企业</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">维保人员</view>
						<view class="menu-bar-two-list-li-text">本利一号梯</view>
					</view>
				</view>
			</view>
			<!-- 菜单三 电梯状态-救援-->
			<view class="menu-bar-jy" v-if="active==1 && isShowVideo == true">
				<view class="menu-bar-jy-cont">
					<view class="menu-bar-jy-videl">
						<view class="menu-bar-jy-videl-more" v-if="ds==0">
							<view class="menu-bar-jy-videl-more-li"></view>
							<view class="menu-bar-jy-videl-more-li"></view>
							<view class="menu-bar-jy-videl-more-li"></view>
							<view class="menu-bar-jy-videl-more-li"></view>
						</view>
						<view class="menu-bar-jy-videl-big" v-else>
							<view class="menu-bar-jy-videl-big-box"></view>
						</view>
					</view>
					<view class="menu-bar-jy-list">
						<view class="menu-bar-jy-list-li" @click="meuActTap(item.id)" :class="item.id == meuActive?'bar_active':''" v-for="(item, index) in meuBarList"
						 :key="item.id">{{ item.name }}</view>
					</view>
					<view class="menu-bar-jy-btn">
						<view class="menu-bar-jy-btn-sta">
							<image src="../../static/image/wxj/3.png" mode=""></image>启动救援
						</view>
						<view class="menu-bar-jy-btn-over" @click="offVideo">
							<image src="../../static/image/wxj/4.png" mode=""></image>终止救援
						</view>
					</view>
				</view>
			</view>
			<!-- 菜单四 运行统计 -->
			<view class="menu-yx" v-if="active==4">
				<view class="menu-yx-list">
					<view class="menu-yx-list-li" v-for="(item, index) in yxList" :key="item.id">
						<view class="menu-yx-list-li-title" @click="yxTap(item.id)">
							<view class="menu-yx-list-li-title-left">
								{{ item.name }}
							</view>
							<view class="menu-yx-list-li-title-right">
								<image :class="yxId == item.id?'xz':''" src="../../static/image/wxj/top1.png" mode=""></image>
							</view>
						</view>
						<view class="menu-yx-list-li-list" v-if="yxId == item.id">
							<view class="menu-yx-list-li-list-li" v-for="(i,index) in item.yxTwoList" :key="i.id">
								<view class="menu-yx-list-li-list-li-title">
									{{ i.name }}
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ i.text }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 菜单五 电梯参数 -->
			<view class="menu-yx" v-if="active==3">
				<view class="menu-cs">
					<view class="menu-cs-title">
						<view class="menu-cs-title-time">
							当前参数获取时间：2020-02-20 12:23
						</view>
						<view class="menu-cs-title-btn">
							获取数据
						</view>
					</view>
					<!--  -->
					<view class="menu-cs-list">
						<view class="menu-cs-list-li" v-for="(item,index) in dtcsArr" :key="item.id">
							<view class="menu-cs-list-tile" @click="omeMuTap(item.id)">
								<view class="menu-cs-list-tile-left">{{ item.name }}</view>
								<view class="menu-cs-list-tile-right">
									<image :class="oneId == item.id?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
								</view>
							</view>
							<view class="menu-cs-list2" v-if="item.id == oneId">
								<view class="menu-cs-list2-li" v-for="(i,index) in item.dtcsArrList">
									<view class="menu-cs-list2-tile" @click="twoMuTap(i.id)">
										<view class="menu-cs-list-tile-left menu-cs-list2-tile-left">{{ i.name }}</view>
										<view class="menu-cs-list-tile-right">
											<image :class="twoId == i.id?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
										</view>
									</view>
									<!-- 第一类 列表 表格 -->
									<view class="menu-cs-list3" v-if="item.stu == 0 && twoId == i.id">
										<view class="menu-cs-list3-li"  v-for="(l,index) in i.dtcsArrListTwo">
											<view class="menu-cs-list3-li-tile">{{ l.name }}</view>
											<view class="menu-cs-list3-li-cont">
												<!-- 表格 -->
												<view class="menu-cs-list3-li-cont-bg" v-if="l.isbg==0">
													<view class="menu-cs-list3-li-cont-bg-li" v-for="(d,index) in l.bgList" :key="d.index">{{ d.title }}:{{ d.name }}</view>
												</view>
												<!-- 列表 -->
												<view class="menu-cs-list3-li-cont-lb" v-else>
													<view class="menu-cs-list3-li-cont-lb-dd" v-for="(e,index) in l.bgList" :key="e.index"><text :class="e.studs == 0?'textA':'textB'">{{ e.title }}</text>{{ e.name }}</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 第二类 列表 -->
									<view class="menu-cs-list4" v-if="item.stu == 1 && twoId == i.id">
										<view class="menu-cs-list4-li" v-for="(j,index) in i.dtListCsInfo">
											<view class="menu-cs-list4-li-title">
												{{ j.name }}
											</view>
											<view class="menu-cs-list4-li-btn">
												<view class="menu-cs-list4-li-btn-num">{{ j.text }}</view>
												<view class="menu-cs-list4-li-btn-text">{{ j.dlText }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 菜单六 维保记录 -->
			<view class="menu-yx" v-if="active==5">
				<view class="menu-yx-wb">
					<view class="menu-yx-wb-title">
						<view class="menu-yx-wb-title-title">维保时间</view>
						<view class="menu-yx-wb-title-title">维保状态</view>
					</view>
					<view class="menu-yx-wb-list">
						<scroll-view scroll-y="true" :lower-threshold="thrNum" class="scroll-y" v-if="wbList.length>0" @scrolltolower="wbLower">
							<view class="scroll-li" v-for="(item,index) in wbList" :key='item.index'>
								<view class="scroll-li-time">{{ item.time }}</view>
								<view class="scroll-li-time">
									<text v-if='item.studes == 1'>已完成</text>
									<text v-if='item.studes == 2'>未完成</text>
								</view>
							</view>
							<!-- 加载中/没有更多数据 -->
							<uni-load-more iconType="snow" :iconSize="14" :status="status1" />
						</scroll-view>
						<!-- 没有数据 -->
						<view class="null" v-else>
							<Null :title="title"></Null>
						</view>
					</view>
				</view>
			</view>
			<!-- 菜单七 故障记录 -->
			<view class="menu-yx" v-if="active==6">
				<view class="menu-yx-wb">
					<view class="menu-yx-wb-title">
						<view class="menu-gz-wb-title-title">开始时间</view>
						<view class="menu-gz-wb-title-title">故障描述</view>
						<view class="menu-gz-wb-title-title">故障码</view>
						<view class="menu-gz-wb-title-title">状态</view>
					</view>
					<view class="menu-yx-wb-list">
						<scroll-view scroll-y="true" :lower-threshold="thrNum" class="scroll-y" v-if="gzList.length>0" @scrolltolower="gzLower">
							<view class="gz-scroll-li" v-for="(item,index) in gzList" :key='item.index'>
								<view class="gz-scroll-li-time">{{ item.time }}</view>
								<view class="gz-scroll-li-time">{{ item.desc }}</view>
								<view class="gz-scroll-li-time">{{ item.dm }}</view>
								<view class="gz-scroll-li-time">
									<text v-if='item.studes == 1'>已完成</text>
									<text v-if='item.studes == 2'>未完成</text>
								</view>
							</view>
							<!-- 加载中/没有更多数据 -->
							<uni-load-more iconType="snow" :iconSize="14" :status="status2" />
						</scroll-view>
						<!-- 没有数据 -->
						<view class="null" v-else>
							<Null :title="title"></Null>
						</view>
					</view>
				</view>
			</view>
			<!-- 菜单八 内部OI -->
			<view class="menu-yx" v-if="active==7">
				<view class="menu-yx-oi">
					<view class="menu-yx-oi-li" v-for="(item,index) in OIList" :key="item.id">
						<view class="menu-yx-oi-li-top" @click="OiListTap(item.id)">
							<view class="menu-yx-oi-li-top-title">{{ item.name }}</view>
							<view class="menu-yx-oi-li-top-img"><image :class="OiId == item.id?'xz':''" src="../../static/image/wxj/up.png" mode=""></image></view>
						</view>
						<view class="menu-yx-oi-li-cont" v-if="OiId == item.id">
							<view class="menu-yx-oi-li-cont-li" v-for="(i,index) in item.OiListArr" :key="i.id"><text :class="i.stu == 1?'textA':'textB'">{{ i.bh }}</text>{{ i.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			Null,uniLoadMore
		},
		data() {
			return {
				OiId:0,
				status1: 'more',
				status2: 'more',
				title: '暂无数据',
				thrNum: 150,
				contentText: {
				    contentdown: '上拉加载更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多'
				},
				oneId: 0,
				twoId: 0,
				threId: 0,
				yxId: 0,
				isShowVideo: false,
				meuActive: 5,
				ds: 0,
				isKai: false,
				active: 0,
				isBar: false,
				isShow: true,
				name: '电梯监控详情 ',
				meuBarList: [{
						id: 1,
						name: "轿厢"
					},
					{
						id: 2,
						name: "轿顶"
					},
					{
						id: 3,
						name: "机房"
					},
					{
						id: 4,
						name: "轿底"
					},
					{
						id: 5,
						name: "全部"
					}
				],
				bar: [{
						id: 1,
						name: '电梯状态',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 2,
						name: '电梯信息',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 3,
						name: '电梯参数',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 4,
						name: '运行统计',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 5,
						name: '维保记录',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 6,
						name: '故障记录',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 7,
						name: '内部IO',
						img: '../../static/image/wxj/top.png',
						isImg: false
					},
					{
						id: 8,
						name: '收起',
						img: '../../static/image/wxj/top.png',
						isImg: true
					}
				],
				//运行统计
				yxList: [{
						id: 1,
						name: "累加运行数据",
						yxTwoList: [{
							id: 1,
							name: '电梯运行次数',
							text: '39535'
						}]
					},
					{
						id: 2,
						name: "累加运行数据",
						yxTwoList: [{
								id: 1,
								name: '电梯运行次数',
								text: '39535'
							},
							{
								id: 2,
								name: '电梯运行次数',
								text: '39535'
							},
							{
								id: 3,
								name: '电梯运行次数',
								text: '39535'
							},
							{
								id: 4,
								name: '电梯运行次数',
								text: '39535'
							},
							{
								id: 5,
								name: '电梯运行次数',
								text: '39535'
							}
						]
					}
				],
				// 电梯参数
				dtcsArr: [{
					id: 1,
					name: '故障代码',
					stu: 0,
					dtcsArrList: [{
						id: 1,
						name: '故障记录1',
						dtcsArrListTwo: [{
							id:1,
							name:'表格',
							isbg: 0,
							bgList:[{
								id:1,
								title:'楼层',
								name:'13'
							},
							{
								id:2,
								title:'楼层',
								name:'13'
							},
							{
								id:3,
								title:'楼层',
								name:'13'
							},
							{
								id:4,
								title:'楼层',
								name:'13'
							}]
						},
						{
							id:2,
							name:'OI输入口',
							isbg:1,
							bgList:[{
								id:1,
								title:'02',
								name:'1层后门锁',
								studs: 1,
							},
							{
								id:2,
								title:'02',
								name:'1层后门锁',
								studs: 0,
							},
							{
								id:3,
								title:'02',
								name:'1层后门锁',
								studs: 0,
							},
							{
								id:4,
								title:'02',
								name:'1层后门锁',
								studs: 0,
							}]
						}]
					}]
				},
				{
					id:2,
					name: '电梯参数',
					stu: 1,
					dtcsArrList:[{
						id:1,
						name:'+A1212',
						dtListCsInfo:[{
							id:1,
							name:'SSDDEDSS',
							text:'12',
							dlText:'下达'
						}]
					}]
				}],
				// 维保记录
				wbList:[
					{id:1,time:'2020-02-11 11:12',studes:1},
					{id:2,time:'2020-02-11 11:12',studes:2},
					{id:3,time:'2020-02-11 11:12',studes:1},
				],
				// 故障记录
				gzList:[
					{id:1,time:'2020/02/11 11:12',studes:1, desc:'我错了', dm:'E12'},
					{id:2,time:'2020/02/11 11:12',studes:2, desc:'我错了', dm:'E12'},
					{id:3,time:'2020/02/11 11:12',studes:1, desc:'我错了', dm:'E12'},
				],
				// OI
				OIList:[
					{id:1,name:'门锁节点1',OiListArr:[
						{id:1,name:'1成后门',bh:'O2',stu:0},
						{id:2,name:'1成后门',bh:'O2',stu:1},
						{id:2,name:'1成后门',bh:'O2',stu:1},
						{id:2,name:'1成后门',bh:'O2',stu:1},
						{id:3,name:'1成后门',bh:'O2',stu:1},
						{id:3,name:'1成后门',bh:'O2',stu:1}
					]},
					{id:2,name:'门锁节点2',OiListArr:[
						{id:1,name:'1成后门',bh:'O2',stu:1}
					]}
				]
			}
		},
		onLoad: function(option) {
			this.name = option.name;
		},
		onReady: function() {
			let that = this;
			uni.setNavigationBarTitle({
				title: that.name
			})
			setInterval(function() {
				that.isShow = !that.isShow;
			}, 6000)
		},
		methods: {
			// 事件方法
			OiListTap(id){
				let that = this;
				if(that.OiId == id){
					that.OiId = 0
				}else{
					that.OiId = id
				}
			},
			// 维保记录滚动底部触发事件
			wbLower(){
				let that = this;
				that.status1 = 'loading'
				setTimeout(function () {
					that.status1 = 'noMore'
				}, 2000);
			},
			gzLower(){
				let that = this;
				that.status2 = 'loading'
				setTimeout(function () {
					that.status2 = 'noMore'
				}, 2000);
			},
			omeMuTap(id){
				let that = this;
				if(that.oneId == id){
					that.oneId = 0;
				}else{
					that.oneId = id;
				}
			},
			twoMuTap(id){
				let that = this;
				if(that.twoId == id){
					that.twoId = 0;
				}else{
					that.twoId = id;
				}
			},
			openTapBar() {
				let that = this;
				that.isBar = true;
			},
			meuActTap(id) {
				let that = this;
				that.meuActive = id;
				if (id == 5) {
					that.ds = 0;
				} else {
					that.ds = id;
				}
			},
			jyTap() {
				let that = this;
				that.isShowVideo = true;
			},
			offVideo() {
				let that = this;
				that.isShowVideo = false;
			},
			yxTap(id) {
				let that = this;
				if (that.yxId == id) {
					that.yxId = 0;
				} else {
					that.yxId = id;
				}
			},
			offTapBar(id) {
				let that = this;
				that.active = id;
				if (id == 1) {
					console.log(id)
				} else if (id == 2) {
					console.log(id)
				} else if (id == 3) {
					console.log(id)
				} else if (id == 4) {
					console.log(id)
				} else if (id == 5) {
					console.log(id)
				} else if (id == 6) {
					console.log(id)
				} else if (id == 7) {
					console.log(id)
				} else {
					that.isBar = false;
				}
			}
		}
	}
</script>

<style scoped>
	@import "../../static/css/wxj.css";
</style>
