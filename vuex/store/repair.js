import request from '../../service/request.js'

const typeId = ['wait', 'pending', 'doing', 'finish', 'all']

export default{
	state: () => ({
		list: {}
	}),
	
	mutations: {
		setList: function(state, data) {
			state.list = data
		},
		updateRepairState: function(state, {id, oldType, newType}) {
			console.log('更新工单列表数据状态', {id, oldType, newType})
			console.log('更新工单列表数据状态', state.list)
			// 旧状态的索引位置
			const key = typeId[oldType - 1]
			// 新状态的索引位置
			const newKey = typeId[newType - 1]
			state.list[key].forEach((item, index) => {
				if(item.id == id) {
					// 更新当前故障工单的状态
					item.repair_type = newType
					// 移动到新状态的数组中
					state.list[newKey].unshift(item)
					// 从旧状态的数组中移除
					state.list[key].splice(index, 1)
				}
			})
		}
	},
	
	actions: {
		refreshRepair: async function(context) {
			var option = {page: 1, limit: 100}
			var url = '/maint/fault_order'
			var res = await Promise.all([
				request.post(url, {...option, type: 1}),
				request.post(url, {...option, type: 2}),
				request.post(url, {...option, type: 3}),
				request.post(url, {...option, type: 4}),
				request.post(url, {...option, type: 0})
			])
			var data = {
				wait: res[0].data,
				pending: res[1].data,
				doing: res[2].data,
				finish: res[3].data,
				all: res[4].data
			}
			console.log(data)
			context.commit('setList', data)
		}
	}
}