var Twit = require('twit');

var config = require('./config'),
	clamp = require('./clamp'),
	timer = require('./timer'),
	factory = require('./factory');

var T = new Twit(config);

var url = 'http://polysent.com/api/newest?page=1&per_page=1';
var minutes = 2;

function tweet(){
	factory.get(url, function(res){
		var poll = {};
		var parsed;
		try {
			parsed = JSON.parse(res).docs[0];
		} catch(e) {
			throw e;
		}
        poll.question = clamp(parsed.question, 65);
    	poll.category = parsed.category;
    	poll.slug = parsed._id;
		poll.url = 'http://polysent.com/p/' + poll.slug;
		var status = [poll.question, poll.url, '#' + poll.category, '#poll'].join(' ');
		T.get('search/tweets', { q: status, result_type: 'recent' }, function(err, data, response) {
			// prevent tweeting if results found.
			if(data.statuses.length) return; 
			T.post('statuses/update', { status: status }, function(err, data, response) {
				if(err) console.log(err.message);
				console.log('Poll' + ' ' + poll.slug + ' ' + 'has been tweeted.');
			});
		});
	});
}

timer(60000 * minutes, tweet);