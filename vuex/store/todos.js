import request from '../../service/request.js'

export default {
	state: () => ({
		list: {
			repair: [],
			maint: [],
			prompt: [],
			answer: []
		}
	}),
	
	mutations: {
		refreshTodoList(state, data) {
			state.list = data
		},
		todoListUpdateRepair(state, {id, type}) {
			state.list.repair = state.list.repair.map(item => {
				if(item.repair_id == id) {
					item.repair_type = type
				}
				return item
			})
		},
		todoListUpdateMaint(state, {id, type}) {
			state.list.maint = state.list.maint.map(item => {
				if(item.is_maintain == id) {
					item.is_maintain = type
				}
				return item
			})
		}
	},
	
	actions: {
		requestTodos: async function (context) {
			var res = await request.post('/backlog')
			context.commit('refreshTodoList', res.data)
		}
	}
}