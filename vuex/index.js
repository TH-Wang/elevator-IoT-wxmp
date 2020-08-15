import Vue from 'vue'
import Vuex from 'vuex'
import system from './store/system.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		system
	}
})

export default store