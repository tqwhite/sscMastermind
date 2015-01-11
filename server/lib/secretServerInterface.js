
secretServerInterface = {

	post: function(secretBody) {
		var result = HTTP.call('POST', 'http://localhost:5000/access', {
			data: secretBody
		})
		return result;
	},

	get: function() {
		var result = HTTP.call('GET', 'http://localhost:5000/access')
		return result;
	}
}
