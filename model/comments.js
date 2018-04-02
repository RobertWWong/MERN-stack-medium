//Time to learn Schemas for our project
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create new instances of the mongoose obj
//Ideally, what it means to be a comment

var CommentsSchema = new Schema({
	author : String,
	text: String
});

//Export so we can use it in the server
module.exports = mongoose.model('Comment', CommentsSchema);