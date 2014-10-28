var express = require('express'),
	bodyParser = require('body-parser');

var app = express();

app.set(function () {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/app')); 
	app.use(express.methodOverride());
});

app.use(express.bodyParser());

app.listen(process.env.PORT || 4730);