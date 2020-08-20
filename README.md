## 安装依赖

只有两个：vuex、md5

```bash
npm intall vuex md5 -S
```

## 目录结构

```
│  .gitignore
│  App.vue              # 根组件
│  main.js              # 入口文件
│  manifest.json        # 项目配置
│  package.json         # 只有两个依赖：md5、vuex
│  pages.json           # 小程序配置
│  README.md
│  template.vue         # 普通页面的模板
│  uni.scss
│  yarn.lock
│  
├─components            # 公用组件
│  ├─CommonButton       # 常用的底部提交按钮
│  ├─Empty              # 空数据展示文字
│  ├─NavHeader          # 自定义顶部导航栏
│  ├─Search             # 搜索框
│  ├─Tabbar             # 底部自定义tabbar
│  │   Tabbar.vue
│  │   tabbarConfig.js  # tabbar配置（已配置）
│  └─Tabs               # 选项卡
│          
├─data                  # 测试数据
│      
├─mixin                 # 公用混入
│   pageScroll.js       # 滚动列表页面（修改中）
│              
├─pages                 # 页面
│  ├─index              # 首页（tabbar页面）
│  │   gridConfig.js    # 首页网格导航菜单的配置项（需配置跳转页面）
│  │   index.vue
│  ├─login              # 登录、绑定账号
│  │   login.vue
│  │   rules.js
│  ├─maintain           # 保养（tabbar页面）
│  ├─mine               # 我的（tabbar页面）
│  └─repair             # 急修（tabbar页面）
│          
├─service               # 请求相关
│   request.js          # 封装好的请求函数，直接引用
│      
├─static                # 静态资源
│  │  uni.ttf
│  ├─css                # 公用样式
│  ├─icon               # 图标
│  └─image              # 图片
│
├─utils                 # 公用工具函数
│  	debounce.js
│
└─vuex                  # vuex
    │ index.js          # store入口文件
    └─store
         request.js     # 请求模块，存储api的url
         system.js      # 系统配置，状态栏高度
         user.js        # 用户信息
```

## 运行

1. 点击微信小程序运行后，会打包出一个unpackage文件夹
2. 将 `unpackage/dist/dev/mp-weixin` 文件夹导入到微信开发者工具

## 请求数据

``` js
//暂没有把该方法封装成插件，所以每次使用还需引入一下
import request from '../../service/request.js'

export default {
	onLoad: async function() {
		var res = await request.post('/requestURL', { ...data })
		// ...
	}
}

// 参数:		url请求路径，data发送的数据
// 返回值: Promise对象 => res返回的结果
```

## 页面模板

根目录下的template.vue文件夹