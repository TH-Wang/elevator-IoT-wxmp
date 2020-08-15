import Vue from 'vue'
import store from './vuex/index.js'
import App from './App'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
