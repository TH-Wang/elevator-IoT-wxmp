export default function (data) {
	if(typeof data == "object") {
		return Object.keys(data).length == 0
	}
	else if(typeof data == "string") {
		return Boolean(data)
	}
	else {
		throw new Error('Function isEmpty error: Parameter type error, can only pass in object, string')
	}
}