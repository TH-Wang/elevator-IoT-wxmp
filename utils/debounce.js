function debounce(func, wait) {
	var timer = null
	
	return function() {
		var context = this
		var args = arguments
		clearTimeout(timer)
		timer = setTimeout(function() {
			func.call(context, ...args)
		}, wait)
	}
}

export default debounce