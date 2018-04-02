//Comment.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';


class Comment extends Component {
	constructor(props){
		super(props);
		this.state = {
			toUpdate: false,
			author : '',
			text : ''
		};
	//Time to do some Binding, no idea what that means 
	//Unless it's data binding with respect to the elements
	this.deleteComment = this.deleteComment.bind(this);
	this.updateComment = this.updateComment.bind(this);
	this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
	this.handleAuthorChange = this.handleAuthorChange.bind(this);
	this.handleTextChange = this.handleTextChange.bind(this);
	}

	updateComment(event){
		event.preventDefault();
		//So this brings up an update field when we click the update link
		this.setState({ toUpdate : !this.state.toUpdate});
	}

	deleteComment(event){
		event.preventDefault();	//what does this do tho?
		let id = this.props.uniqueID;
		this.props.onCommentDelete(id);
		console.log(`You've been bamboozled!`);
	}


	//Hey, just wanna let you know that wherever you decide to create your 
	//Comment box, you can decide its key or uniqueId values on creation
	//Stick to a standardize way of identifying said comment box
	//When you want to modify it, like we are doing right now

	//Okay, key is not a prop, go review React syntax and attributes pham. This needs working pham
	handleCommentUpdate(event){
		event.preventDefault();
		let id = this.props.uniqueID;

		//Yea we are literally repeating code from CommentBox.js
		let author = (this.state.author) ? this.state.author : null;
		let text = (this.state.text) ? this.state.text : null;

		let comment = {author : author, text : text};

		this.props.onCommentUpdate(id,comment);
		this.setState({
			toUpdate: !this.state.toUpdate,
			author: '',
			text: ''
		})
	}

	//what is this private function? What type is this event object as well?
	//There's a lot that's not explained, as in is this standard for all button clicked? 
	//Or fields entered?
	handleTextChange(event){
		this.setState({text: event.target.value});
	}

	handleAuthorChange(event){
		this.setState({author: event.target.value});
	}


	
	rawMarkup() {
		let rawMarkup = marked(this.props.children.toString());
		return { __html: rawMarkup };
	}
	render() {
		return (
		<div style={ style.comment }>
		<h3>{this.props.author}</h3>
			<span dangerouslySetInnerHTML={ this.rawMarkup() } />
			<a style = {style.updateLink} href= '#' onClick = {this.updateComment}>
				Update me!
			</a>
			<a style = {style.deleteLink} href= '#' onClick = {this.deleteComment}>
				EXTERMINATE(del)
			</a>

			{
				(this.state.toUpdate) ?
				(
					<form onSubmit = {this.handleCommentUpdate}>
					<input
						type= 'text'
						placeholder='Update name…'
						style={ style.commentFormAuthor }
						value={ this.state.author }
						onChange= { this.handleAuthorChange } />
					<input
						type='text'
						placeholder='Update your comment…'
						style= { style.commentFormText }
						value={ this.state.text }
						onChange={ this.handleTextChange } />
					<input
						type='submit'
						style={ style.commentFormPost }
						value='Update' />
					</form>
				): null
			}
		</div>
		)
	}
}

export default Comment;
