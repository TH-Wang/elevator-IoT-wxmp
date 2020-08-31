<template>
	<view class="ele-info" :class="isShow?'anme1':'anme2'">
		<!-- 电梯 -->
		<view class="ele-box">
			<image src="../../static/image/wxj/dt.png" mode=""></image>
			<view class="ele-box-num">{{ lcNum || 0 }}</view>
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
				<view class="menu-bar-list-li" :class="item.id == active?'bar_active':''" v-for="(item, index) in bar" :key="item.id" @click="offTapBar(item.id)">{{ item.name }}
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
						<view class="menu-bar-two-list-li-text">{{ dtInfo.name }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯品牌</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.brand_id || '未知' }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯型号</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.model || '未知' }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯梯种</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.variety }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">电梯地址</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.address }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">使用单位</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.company_id2 }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">维保企业</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.company_id3 }}</view>
					</view>
					<view class="menu-bar-two-list-li">
						<view class="menu-bar-two-list-li-title">维保人员</view>
						<view class="menu-bar-two-list-li-text">{{ dtInfo.user_id1 }} {{ dtInfo.user_id2 }}</view>
					</view>
				</view>
			</view>
			<!-- 菜单三 电梯状态-救援-->
			<view class="menu-bar-jy" v-if="active==1 && isShowVideo == true">
				<view class="menu-bar-jy-cont">
					<view class="menu-bar-jy-videl">
						<view class="menu-bar-jy-videl-more" v-if="ds==0">
							<view class="menu-bar-jy-videl-more-li"><video src="https://yanuojixie.oss-cn-beijing.aliyuncs.com/video/15986882862966.mp4" controls></video></view>
							<view class="menu-bar-jy-videl-more-li"><video src="https://yanuojixie.oss-cn-beijing.aliyuncs.com/video/15986882862966.mp4" controls></video></view>
							<view class="menu-bar-jy-videl-more-li"><video src="https://yanuojixie.oss-cn-beijing.aliyuncs.com/video/15986882862966.mp4" controls></video></view>
							<view class="menu-bar-jy-videl-more-li"><video src="https://yanuojixie.oss-cn-beijing.aliyuncs.com/video/15986882862966.mp4" controls></video></view>
						</view>
						<view class="menu-bar-jy-videl-big" v-else>
							<view class="menu-bar-jy-videl-big-box"><video src="https://yanuojixie.oss-cn-beijing.aliyuncs.com/video/15986882862966.mp4" controls></video></view>
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
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									电梯编码
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.elevator_id || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									运行次数
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.r_times || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									运行时间
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.r_duration || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									运行距离
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.r_distance || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									开门次数
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.o_times || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									故障时间
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.e_duration || 0}}
								</view>
							</view>
							<view class="menu-yx-list-li-list-li">
								<view class="menu-yx-list-li-list-li-title">
									序列号
								</view>
								<view class="menu-yx-list-li-list-li-text">
									{{ yxTowJson.serial_number || 0}}
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
							当前参数获取时间：{{ newTime }}
						</view>
						<view class="menu-cs-title-btn">
							获取数据
						</view>
					</view>
					<!--  -->
					<view class="menu-cs-list">
						<view class="menu-cs-list-li">
							<view class="menu-cs-list-tile" @click="omeMuTap(1)">
								<view class="menu-cs-list-tile-left">故障代码</view>
								<view class="menu-cs-list-tile-right">
									<image :class="oneId==1?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
								</view>
							</view>
							<view class="menu-cs-list2" v-if="1 == oneId">
								<view class="menu-cs-list2-li" v-for="(i,index) in gzArrList" :key="i.name">
									<view class="menu-cs-list2-tile" @click="twoMuTap(i.id)">
										<view class="menu-cs-list-tile-left menu-cs-list2-tile-left">{{ i.name }}</view>
										<view class="menu-cs-list-tile-right">
											<image :class="twoId == i.id?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
										</view>
									</view>
									<!-- 第一类 列表 表格 -->
									<view class="menu-cs-list3" v-if="twoId == i.id">
										<view class="menu-cs-list3-li"  v-for="(l,index) in i.gzArrListTl" :key='l.index'>
											<view class="menu-cs-list3-li-tile">{{ l.name }}</view>
											<view class="menu-cs-list3-li-cont">
												<!-- 表格 -->
												<view class="menu-cs-list3-li-cont-bg" v-if="l.isbg==0">
													<view class="menu-cs-list3-li-cont-bg-li" v-for="(d,index) in l.bgList" :key="d.name">{{ d.title }}:{{ d.name }}</view>
												</view>
												<!-- 列表 -->
												<view class="menu-cs-list3-li-cont-lb" v-else>
													<view class="menu-cs-list3-li-cont-lb-dd" v-for="(e,index) in l.bgList" :key="e.name"><text :class="e.studs == 0?'textA':'textB'">{{ e.title }}</text>{{ e.name }}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="menu-cs-list-li">
							<view class="menu-cs-list-tile" @click="omeMuTapli(2)">
								<view class="menu-cs-list-tile-left">电梯参数</view>
								<view class="menu-cs-list-tile-right">
									<image :class="oneId == 2?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
								</view>
							</view>
							<view class="menu-cs-list2" v-if="oneId == 2">
								<view class="menu-cs-list2-li" v-for="(item,index) in dtCsArrList" :key="item.id">
									<view class="menu-cs-list2-tile" @click="twoMuTapLi(item.id,item.argu_value,item.s_id)">
										<view class="menu-cs-list-tile-left menu-cs-list2-tile-left">{{ item.argu_name }}</view>
										<view class="menu-cs-list-tile-right">
											<image :class="twoIdLi == item.id?'xz':''" src="../../static/image/wxj/up.png" mode=""></image>
										</view>
									</view>
									<view class="menu-cs-list4" v-if="item.argu_value == '' && twoIdLi == item.id">
										<view class="menu-cs-list4-li" v-for="(j,index) in dtCsArrListTwo" :key="j.id">
											<view class="menu-cs-list4-li-title">
												{{ j.argu_name }}
											</view>
											<view class="menu-cs-list4-li-btn">
												<view class="menu-cs-list4-li-btn-num">{{ j.argu_value || 0}}</view>
												<view class="menu-cs-list4-li-btn-text">下达</view>
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
								<view class="scroll-li-time">{{ item.maint_time }}</view>
								<view class="scroll-li-time">
									<text v-if='item.is_maintain == 1'>待维保</text>
									<text v-if='item.is_maintain == 2'>已维保</text>
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
								<view class="gz-scroll-li-time">{{ item.fault_start_time }}</view>
								<view class="gz-scroll-li-time">{{ item.fault_syn }}</view>
								<view class="gz-scroll-li-time">{{ item.fault_code }}</view>
								<view class="gz-scroll-li-time">
									<text v-if='item.repair_type == 0'>待审核</text>
									<text v-else-if='item.repair_type == 1'>待接警</text>
									<text v-else-if="item.repair_type == 2">待处理</text>
									<text v-else-if='item.repair_type == 3'>处理中</text>
									<text v-else-if="item.repair_type == 4">已完成</text>
									<text v-else-if='item.repair_type == 5'>误报确认</text>
									<text v-else-if="item.repair_type == 6">自动修复</text>
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
					<view class="menu-yx-oi-li" v-for="(item,index) in OIList" :key="item.name">
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
	import request from '@/service/request.js'
	import Null from '@/components/uni-null/uni-null.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components:{
			Null,uniLoadMore
		},
		data() {
			return {
				// 参数获取时间
				newTime: '未知',
				//故障
				gzPage: 1,
				gzIsMore: true,
				// 维保
				wbPage: 1,
				wbIsMore: true,
				
				// 电梯信息
				dtInfo:{},
				
				size: 10,
				dtBhNum: 0,
				dtId: 0,
				lcNum: 0,
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
				twoIdLi: 0,
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
					}
				],
				yxTowJson:{},
				// 电梯参数列表
				dtCsArrList:[],
				//二级电梯参数列表
				dtCsArrListTwo:[],
				//电梯参数故障记录
				gzArrList: [{
					id: 1,
					name: '故障记录1',
					gzArrListTl: [{
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
				}],
				
				// 维保记录
				wbList:[],
				// 故障记录
				gzList:[],
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
			let that = this;
			const item = JSON.parse(decodeURIComponent(option.item));
			that.name = item.name;
			that.dtId = item.elevator_id;
			that.dtBhNum = item.elevator_number;
			that.getDtLc(item.elevator_id,item.elevator_number);
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
			// 获取电梯楼层
			getDtLc(id,eleNum){
				let that = this;
				uni.showLoading({
					title:'加载中...'
				})
				let data = {
					id: id,
					ele_unmber:eleNum
				};
				request.post('/lift/get_floor',data).then((res)=>{
					if(res.code == 1){
						that.lcNum = res.actual_floor;
						uni.hideLoading();
					}
				})
			},
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
				if(that.wbIsMore == true){
					let pageNumber = that.wbPage + 1;
					that.status1 = 'loading';
					that.wbPage = pageNumber;
					that.getWbArr(that.dtId,1);
				}
			},
			gzLower(){
				let that = this;
				if(that.gzIsMore == true){
					let pageNumber = that.gzPage + 1;
					that.status2 = 'loading';
					that.gzPage = pageNumber;
					that.getGzArr(that.dtId,1);
				}
			},
			omeMuTap(id){
				let that = this;
				if(that.oneId == id){
					that.oneId = 0;
				}else{
					that.oneId = id;
				}
			},
			omeMuTapli(id){
				let that = this;
				if(that.oneId == id){
					that.oneId = 0;
				}else{
					that.oneId = id;
				}
			},
			twoMuTap: function(id){
				let that = this;
				if(that.twoId == id){
					that.twoId = 0;
				}else{
					that.twoId = id;
				}
			},
			twoMuTapLi: function(id,value,isd){
				console.log(id)
				console.log(value)
				console.log(isd)
				let that = this;
				if(value){
					uni.showToast({
						title:'没有下级数据',
						icon: 'none'
					})
				}else{
					if(that.twoIdLi == id){
						that.twoIdLi = 0;
					}else{
						that.twoIdLi = id;
						that.getDtXjcs(isd);
					}
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
					// 获取电梯详情
					that.getDtInfo();
				} else if (id == 3) {
					//获取电梯
					that.getDtCs();
				} else if (id == 4) {
					// 运行统计
					that.getLjTj();
				} else if (id == 5) {
					// 维保记录
					that.wbPage = 1;
					that.wbIsMore = true;
					that.getWbArr(that.dtId,'')
				} else if (id == 6) {
					// 故障记录
					that.gzPage = 1;
					that.gzIsMore = true;
					that.getGzArr(that.dtId,'');
				} else if (id == 7) {
					//oi
					that.getOIArr();
				} else {
					that.isBar = false;
				}
			},
			//获取电梯故障记录
			getGzArr(dtId,isSla){
				let that = this;
				uni.showLoading({
					title:'加载中...'
				})
				let data = {
					elevator_id: dtId,
					limit: that.size,
					page: that.gzPage
				};
				request.post('/maint/fault_info',data).then((res) => {
					console.log(res)
					if(res.code == 1){
						if(res.data.length < 10){
							that.gzIsMore = false;
							that.status2 = 'noMore';
						}
						if(isSla){
							that.gzList = that.gzList.concat(res.data)
						}else{
							that.gzList = [];
							that.gzList = res.data;
						}
						uni.hideLoading();
					}
				})
			},
			// 获取维保记录
			getWbArr(dtId,isSla){
				let that = this;
				uni.showLoading({
					title:'加载中...'
				})
				let data = {
					elevator_id: dtId,
					limit: that.size,
					page: that.wbPage
				};
				request.post('/maint/maint_info',data).then((res) => {
					console.log('1',res)
					if(res.code == 1){
						if(res.data.length < 10){
							that.wbIsMore = false;
							that.status1 = 'noMore';
						}
						if(isSla){
							that.wbList = that.wbList.concat(res.data)
						}else{
							that.wbList = [];
							that.wbList = res.data;
						}
						uni.hideLoading();
					}
				})
			},
			// 累计运行统计
			getLjTj(){
				let that = this;
				let data ={
					code: that.dtBhNum
				};
				request.post('/lift/get_run',data).then((res) =>{
					console.log(res)
					if(res.code == 1){
						that.yxTowJson = res.data
					}
				})
			},
			//获取电梯详情/lift/one_info
			getDtInfo(){
				let that = this;
				let data = {
					elevator_id: that.dtId,
					is_archives: 1
				};
				request.post('/lift/one_info',data).then((res) => {
					console.log(res)
					if(res.code == 1){
						that.dtInfo = res.data
					}
				})
			},
			// 获取电梯参数
			getDtCs(){
				let that = this;
				let data = {
					code: that.dtBhNum
				};
				request.post('/Com/parameter',data).then((res) =>{
					console.log(res)
					if(res.code == 1){
						that.newTime = res.data.time;
						that.dtCsArrList = res.data.array;
					}
				})
			},
			// 获取电梯下级参数
			getDtXjcs(isd){
				let that = this;
				let data = {
					code: that.dtBhNum,
					id: isd
				};
				request.post('/Com/child_parameter',data).then((res)=>{
					if(res.code == 1){
						that.dtCsArrListTwo = res.data
					}
				})
			},
			//获取OI
			getOIArr(){
				let that = this;
				let data = {};
				request.post('/Com/io_list',data).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	@import "../../static/css/wxj.css";
	.menu-bar-jy-videl-more-li video{
		width: 100%;
		height: 100%;
	}
	.menu-bar-jy-videl-big-box video{
		width: 100%;
		height: 100%;
	}
</style>
