// var expresponses = requestuire('expresponses');
// var router = expresponses.Router();
// var mongoose = requestuire(`mongoose`);
// var Comment = requestuire(`../model/comments`)

/*
Hey,  here's a cool way to send info from parent to child file
https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-expresponses
*/
module.exports = function (app,router, mongoose, Comment) {
	// body...
	//Setup endpoints via route and init API
	router.get(`/`, function(request, response) {
		// console.log(`Please work homepage`);
		response.json( { message: `API is init`});
	});


	//Adding /comment route to our /api router
	router.route(`/comments`)
		.get(function(request,response){
			// console.log(`\nTbh, i don\`t know how route works for expresponses` );
			//look into schema
			Comment.find(function(err,comments){
				if (err){
					response.send(err);
				}
				// console.log(`so we got ourself a get requestuest, let\` send them a gift\t`,comments,'<----\n');
				//Otherwise let our responseponse be a JSON of whatever
				response.json(comments);
			});
		})
		
		.post(function(request,response){
			var comment = new Comment();
			//Use body parser to create a new comment based on the body author and text
			comment.author = request.body.author;
			comment.text = request.body.text;

			comment.save(function(err){
				if (err)
					response.send(err);
				// response.json({ message : `A comment from ${comment.author} saying ${comment.text} is sent successfully!`});
				response.json({ message :"message sent successfully"});
			});
		});
	//Time to add an endpoint for specific comments based on database id
	router.route('/comments/:comment_id')
		//Here is the update portion of CRUD
		//Now the thing about this is that I am sending a 
		//PUT requestUEST for my Comment Model
		//If you have an object consisting of a author and/or text values, 
		//It can be acquired via the requestuest variable name
		.put(function (request, response){
			Comment.findById(request.params.comment_id, function(err, comment){
				if (err){
					console.log(`Something went wrong for ---> ${comment.params}`);
					response.send(err);
					console.log('You know what, by convetion, just put your brackets up. Save me the headache of scoping blues~~~');
				}

				//This will set a new author/text if there are changes due to a requestuest
				(request.body.author) ? comment.author = request.body.author : null;
				(request.body.text) ? comment.text = request.body.text : null;

				//Save to database
				comment.save(function(err){
					//This is your callback function that js allows you to do asyn
					if (err)
						response.send(err);
					response.json({message: `A comment as has been updated --> ${comment}`});
				});
			});
		})

		//Time to delete
		//STOP SWITCHING request WITH response. fuck it, ima just type it in two different fonts
		.delete(function(request, response){
			// console.log(`wtf: ${request.params}`);
			// console.log(`Is this?: ${request.params.comment_id}`);
			Comment.remove({ _id: request.params.comment_id}, function(err,comment){
				if (err)
					response.send(err);
				response.json({message: `You've just deleted a this comment --> ${comment}`})
			})
		});
	app.use(`/api`, router);

}