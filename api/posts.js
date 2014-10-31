var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('postsdb', server);

db.open(function(err, db){
	if(!err) {
		console.log("Connected to 'postsdb' database");
		db.collection('posts', {strict:true}, function(err, collection){
			if (err) {
				console.log("The 'posts' collection doesn't exist. Creating it with Sample data");
				populateDB();
			}
		});
	}
});

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving Songs: ' + id);
	db.collection('posts', function(err, collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	db.collection('posts', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.postSong = function(req, res) {
	var post = req.body;
	console.log('Adding Song: ' + JSON.stringify(post));
	db.collection('posts', function(err, collection) {
		collection.insert(post, {safe:true}, function(err, result){
			if (err) {
				res.send({'error':'An error has occured'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);	
			}
		});
	});
}

exports.updatePost = function(req, res) {
	var id = req.params.id;
	var posts = req.body;
	console.log('Updating Post: ' + id);
	console.log(JSON.stringify(post));
	db.collection('posts', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occured - ' + err});
			} else {
				console.log('' + result + 'post updated');
				res.send(post);
			}
		});
	});
}

exports.deletePost = function(req, res) {
	var id = req.params.id;
	console.log('Deleting Post: ' + id);
	db.collection('posts', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occured - ' + err});
			} else {
				console.log('' + result + ' post deleted');
				res.send(req.body);
			}
		});
	});
}




var populateDB = function() {
 
    var post = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('posts', function(err, collection) {
        collection.insert(posts, {safe:true}, function(err, result) {});
    });
 
};