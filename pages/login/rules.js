export default {
	channel_number: {
		rule: /^\d{4}$/,
		msg: '通道码必须由4位数字组成'
	},
	name: {
		rule: /^[a-zA-Z\d_]{6,12}$/,
		msg: '6-12位数字、字母、下划线'
	},
	password: {
		rule: [
			/\d/,
			/[a-z]/,
			/[A-Z]/,
			/[~!@#$%^&*{};,.?/'"]/
		],
		msg: '6-18位，包含数字、大写、小写字母、特殊符号中的两种及以上'
	}
}