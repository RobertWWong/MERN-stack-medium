### Things you should know
* This is my work flow for a MERN stack tutorial from bryantheastronaut @ Medium

## In order to start development, you need two servers up and running
* npm react-script start
* npm nf start -p 3000		(where nf is the foreman node module which you downloaded, running on port 3000 (or a different port as defined on server.js)

## Key dependencies used in this app:
# Descriptions are from Bryan the astronaut on a medium post 
* Axios: let us use HTTP methods to communicate with our database.
* Express: provide a framework to set up our Node.js server.
* Body Parser: parse the incoming requests bodies for the info we are sending (gives us access to `req.body` which we will be using soon).
* Foreman: allows us to boot up our API and webpack-dev-server simultaneously.
* Nodemon: watches our server.js file for changes, then restarts it.
* Marked: to convert markdown syntax to html. I used this in place of Remarkable (which the FB tutorial uses)
* Mongoose: abstracts away the MongoDB boilerplate for a simple Schema solution.
