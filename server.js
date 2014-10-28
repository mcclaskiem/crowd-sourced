var fs = require("fs");
var host = "0.0.0.0";
var port = 5000;
var express = require("express");

var app = express(); //use both root and other routes below
app.use(express.static(__dirname + "/app")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    response.send("Hello!!");
});

app.listen(port, host);

