var static = require('node-static');
var express = require('express');
	morgan = require('morgan');
	bodyParser = require('body-parser');
	posts = require('./api/posts');


var app = express();

var env = process.env.NODE_ENV || 'dev';
if ('dev' == env) {
	app.use(morgan('dev'));
	app.use(bodyParser());
};

app.get('/posts', posts.findAll);
app.get('/posts/:id', posts.findById);
app.post('/posts', posts.postSong);
app.put('/posts/:id', posts.updatePost);
app.delete('/posts/:id', posts.deletePost);
//
// Create a node-static server instance to serve the './polymer' folder

var file = new static.Server('./polymer');


require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8000)

app.listen(8001);