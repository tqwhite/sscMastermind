
secretServerInterface = {

	post: function(secretBody) {
		var result = HTTP.call('POST', 'http://localhost:5000/access', {
			data: secretBody
		})
		return result;
	},

	get: function(requestBody) {
		var result = HTTP.call('GET', 'http://localhost:5000/access',{
			data:requestBody
		})
		
		
		var type = result.headers['content-type'].match(/application\/json/) ? 'json' : '';
		switch (type) {
			case 'json':
				result.content=JSON.parse(result.content);
				break;
		}
	
	
		return result;
	}
}
