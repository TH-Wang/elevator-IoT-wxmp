import Vue from 'vue'
import Vuex from 'vuex'
import system from './store/system.js'
import request from './store/request.js'
import user from './store/user.js'
import repair from './store/repair.js'
import todos from './store/todos.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		system,
		request,
		user,
		repair,
		todos
	}
})

export default store