//our server

`user strict`;

console.log(`wtf\n\n`);

//Import dependencies
var express = require(`express`);
var mongoose = require(`mongoose`);
var bodyParser = require(`body-parser`);
var Comment = require(`./model/comments`)

//Create instances
var app = express();
var router = express.Router();

//Set up our port number
var port = process.env.API_PORT || 3001;

//Just set api to local env variables.   https://hackernoon.com/how-to-use-environment-variables-keep-your-secret-keys-safe-secure-8b1a7877d69c
//Heroku has an option where we could configure it
//Lesson from this? Either store your api on your local computer's environment, 
//or make sure there is another application that store said key for you

var db_user =process.env.DB_USER;		//Feel free use your own db and connections
var db_pw = process.env.PW;


//Connect to our database on MongoLab
//https://mlab.com
mongoose.connect(`mongodb://${db_user}:${db_pw}@ds127899.mlab.com:27899/mernstack_project`)

//Configure APi to use bodyParser so it can look for json in request body
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json());

//This is to prevent Cross origin Resource Sharing Error from occuring.
//Set our headers to allow CORS with middleware

app.use(function( req, res, next){
	res.setHeader(`Access-Control-Allow-Origin`, `*`);
	res.setHeader(`Access-Control-Allow-Credentials`, `true`);
	res.setHeader(`Access-Control-Allow-Methods`, `GET,HEAD,OPTIONS,POST,PUT,DELETE`);
	res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);

	//and remove cacheing so we get the most recent comments
	res.setHeader(`Cache-Control`, `no-cache`);
	next();
});

//get route files from here
// var api_stuff = require('./routes/api');	//Old method for routing stuff

//Ahhh, the magic of the module.export function syntax. Cancer, but then again it's sort of like a class
//Bastardized, but a class notheless
require('./routes/api')(app,router,mongoose, Comment)

//Add any routes before this line, for the use line allows HTTP calls
//Use router config for /api when this endpoint is called

//start server and listens for requests
app.listen(port, function(){
	console.log(`api running on port ${port}`);

});
