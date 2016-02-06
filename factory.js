var http = require('http');

module.exports = {
	get: function(url, cb){
		http.get(url, function(res){
			res.setEncoding('utf8');
			var body = '';
			res.on('data', function(data){
				body += data;
			}).on('end', function(){
				cb(body);
			});
		}).on('error', function(err){
			console.log(err.message);
		});
	}
};