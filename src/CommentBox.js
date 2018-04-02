//CommentBox.js
import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import style from './style';

class CommentBox extends Component{
	constructor(props){
		super(props);
		this.state = { data : []};
		
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
		
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
		this.handleCommentDelete = this.handleCommentDelete.bind(this);

	}

	loadCommentsFromServer(){
		axios.get(this.props.url).
			then(res =>{
				this.setState({ data:res.data});
			})
	}
	handleCommentSubmit(comment){
		//for adding post requests	You need to implement the handle in CommentForm

		//So we are creating a copy of the state data and modifying it there (is it a shallow copy?)
		let comments = this.state.data;
		comment.id = Date.now();
		let newComments = comments.concat([comment]);
		this.setState({data : newComments});

		axios.post(this.props.url, comment)
		.catch(err => {
			this.setState({ data: comments});
			console.log(`Well, there's an error\n\n ${err}`);
		});
	}
	
	handleCommentUpdate(id, comment){
	//This function will update a comment's author/text based on id in db
	//As you can see, this is making the put request from a base url
	//localhost:3001/api/comment/_id_here

	//Params? (url, payload/data)
	axios.put(`${this.props.url}/${id}`, comment)
		.catch(err => {
			console.log('You done goofed');
			console.log(err);
		});
	// console.log(`Here's the be updated:\n${id}  : `,typeof(id));
	// console.log(`${Comment}: `,typeof(comment), '\nThe End!\n');
	}

	handleCommentDelete(id){
		console.log(`What's the url and ID?: ${this.props.url}/${id}`);
		axios.delete(`${this.props.url}/${id}`)
		.then(res =>{
			console.log('Some comment has been deleted');
		})
		.catch(err =>{
			console.log('No can delete pham');
			console.log(err);
		})

	}

	componentDidMount(){
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}

	render(){
		return(
			<div style = { style.CommentBox }>
				<h2>Comments:</h2>
				<CommentList 
				onCommentDelete = {this.handleCommentDelete}
				onCommentUpdate = {this.handleCommentUpdate}
				data = { this.state.data }
				/>
				<CommentForm onCommentSubmit = {this.handleCommentSubmit} />
			</div>
		)
	}
}

export default CommentBox;