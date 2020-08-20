<script>
import request from 'service/request.js'
	
export default {
	globalData: {
		url: 'http://jiujiu.xdiot.net'
	},
	onLaunch: function() {
		uni.getSystemInfo({
			success: ({statusBarHeight}) => {
				this.$store.commit("setStatusBarHeight", statusBarHeight)
			}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

/* 单行省略号 */
.ellipsis{
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}

/* 两行省略号 */
.ellipsis-twolines{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

/* 隐藏滚动条 */
.hidden-scroll::-webkit-scrollbar{
	display: none;	/* Chrome Safari */
}
.hidden-scroll{
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none; /* IE 10+ */
}

/* 列表容器 */
.list-container{
	height: 100%;
}
</style>
