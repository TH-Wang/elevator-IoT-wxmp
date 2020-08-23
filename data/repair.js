var data = {
	pending: [],
	doing: [],
	finish: [],
	all: []
}


for (var i = 0; i < 5; i++) {
	data.pending.push({
		id: `1-${i}`,
		ele_name: '伊士顿电梯',
		repair_sn: 'JX11201905301005357410',
		fault_source: '用户报警',
		fault_syn: '故障故障故障故障故障故障故障故障',
		fault_start_time: '2019-05-30',
		fault_end_time: '2019-06-03',
		address: '重庆市渝中区',
		fault_attr: '硬件故障',
		repair_type: 2
	})
}

for (var i = 0; i < 5; i++) {
	data.doing.push({
		id: `2-${i}`,
		ele_name: '伊士顿电梯',
		repair_sn: 'JX11201905301005357410',
		fault_source: '用户报警',
		fault_syn: '故障故障故障故障故障故障故障故障',
		fault_start_time: '2019-05-30',
		fault_end_time: '2019-06-03',
		address: '重庆市渝中区',
		fault_attr: '硬件故障',
		repair_type: 3
	})
}
for (var i = 0; i < 5; i++) {
	data.finish.push({
		id: `3-${i}`,
		ele_name: '伊士顿电梯',
		repair_sn: 'JX11201905301005357410',
		fault_source: '用户报警',
		fault_syn: '故障故障故障故障故障故障故障故障',
		fault_start_time: '2019-05-30',
		fault_end_time: '2019-06-03',
		address: '重庆市渝中区',
		fault_attr: '硬件故障',
		repair_type: 4
	})
}

data.all = [
	...data.pending,
	...data.doing,
	...data.finish
]

export default data