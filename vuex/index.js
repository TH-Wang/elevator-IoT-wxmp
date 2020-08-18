import Vue from 'vue'
import Vuex from 'vuex'
import system from './store/system.js'
import request from './store/request.js'
import user from './store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		system,
		request,
		user
	}
})

export default store