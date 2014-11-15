var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	genre: String,
	track: String,
	vote: Number
});

module.exports = mongoose.model('Post', PostSchema);