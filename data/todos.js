var data = {
	repair: [],
	maint: [],
	prompt: []
}

for (var i = 0; i < 3; i++) {
	data.repair.push({
		"repair_sn": "JX11201906051557284241",
		"repair_id": 20,
		"fault_start_time": 1559721448,
		"repair_type": 1,
		"ele_name": "DSAD",
		"fault_syn": "门坏了",
		"address": "重庆市市辖区渝中区八度"
	})
	data.maint.push({
		"maint_sn": "MB11201904260932572179_15932",
		"id": 15932,
		"maint_time": 1558627200,
		"unmber": 1036800,
		"main_type": "国标半月保",
		"ele_name": "选择X轴",
		"is_maintain": 1,
		"is_maintain_tan": 1,
		"is_examine": 2,
		"maint_end_time": 0,
		"address": "重庆市市辖区渝中区八度"
	})
	data.prompt.push({
		"time": 1553875200,
		"unmber": -5844415,
		"type": 2,
		"code": "",
		"title": "打撒",
		"type_time": 3
	})
}

export default data
