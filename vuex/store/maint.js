import request from '../../service/request.js'

const typeId = ["all", "pending", "finish", "doing"]
const reqLimit = 20

export default {
	state: () => ({
		pending: {
			limit: reqLimit,
			page: 1,
			dataSource: []
		},
		doing: {
			limit: reqLimit,
			page: 1,
			dataSource: []
		},
		finish: {
			limit: reqLimit,
			page: 1,
			dataSource: []
		},
		all: {
			limit: reqLimit,
			page: 1,
			dataSource: []
		}
	}),
	
	mutations: {
		addMaintData(state, { key, data }) {
			state[key].dataSource.push(...data)
			state[key].page++
			console.log(`追加数据${key}: 当前第 ${state[key].page-1} 页，当前 ${state[key].dataSource.length} 条数据`)
		}
	},
	
	actions: {
		requestMaintList: async function({state, commit}, { type }) {
			const key = typeId[type]
			var { limit, page } = state[key]
			// 判断如果已经是最后一页，则不再请求
			if(state[key].dataSource.length % limit > 0) {
				console.log('无更多数据！')
				return
			}
			var res = await request.post('/maint/main_order', { type, limit, page })
			commit('addMaintData', {
				key,
				data: res.data
			})
		}
	}
}