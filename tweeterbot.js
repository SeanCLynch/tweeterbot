var Twit = require('twit'),
	fs = require('fs')

// Change these to your twitter developer credentials

var T = new Twit({
	consumer_key: '',
	consumer_secret: '',
	access_token: '',
	access_token_secret: ''
});

function startTweeting() { 
	// You can reset this if you need to stop the bot, or it stops for whatever reason
	var count = 0;

	setInterval( function() {
		// Replace SherlockHolmes with whatever text file you want
		fs.readFile("SherlockHolmes.txt", function(err, data) {
			if (err) { console.log("Error is: " + err); }
			var lines = data.toString('utf-8').split("\n");
			if (count > lines.length) { console.log("Too long!"); }

			console.log("Tweet #: "+count+" ---------------");

			var text = lines[count] +" "+lines[count+1];
			var params = { 'status': text };
			console.log("Params = " + JSON.stringify(params));

			if (text != '') {
		 		T.post('statuses/update', params, function (err, reply, response) {
		 		 	if (err) console.log(err);
		 	     	console.log('Tweeted:', reply.text)
		 	     	console.log('Tweeted on:', reply.created_at)
		 		});
		 	}
		});

	count = count + 2;
	}, 900000);
}

startTweeting();
