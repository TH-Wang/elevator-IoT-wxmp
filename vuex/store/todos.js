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
			console.log({id, type})
			state.list.repair = state.list.repair.map(item => {
				if(item.repair_id == id) {
					item.repair_type = type
					console.log(item)
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