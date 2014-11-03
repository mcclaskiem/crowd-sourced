var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
	mongoose.connect('mongodb://admin:admin1234@ds049160.mongolab.com:49160/polymer-music');
var Post = require('./api/posts');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

var port = process.env.port || 8000;



var Post = require('./api/posts');

var router = express.Router();




app.use('/', express.static(__dirname + '/polymer'));

var postsRoute = router.route('/posts');

postsRoute.post(function(req, res) {
	var post = new Post();

	post.genre = req.body.genre;
	post.track = req.body.track;
	post.vote = req.body.vote;

	post.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Song Added to the List!', data: post});
	});
});

postsRoute.get(function(req, res) {

	Post.find(function(err, posts) {
		if (err)
			res.send(err);

		res.json(posts);
	});
});

var postRoute = router.route('/posts/:post_id');

postRoute.get(function(req, res) {
	Post.findById(req.params.post_id, function (err, post) {
		if (err)
			res.send(err);

		res.json(post);
	});
});

postRoute.put(function(req, res) {
	Post.findById(req.params.post_id, function(err, post) {
		if (err)
			res.send(err);

		post.vote = req.body.vote;

		post.save(function(err) {
			if (err)
				res.send(err);

			res.json(post);
		});
	});
});

postRoute.delete(function(req, res) {
	Post.findByIdAndRemove(req.params.post_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Song Removed from the List'});
	});
});

app.use('/', router);

app.listen(port);
