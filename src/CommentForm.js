//CommentForm.js

import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component{
	constructor(props){
		super(props);
		this.state = { author : '' , text : ''};
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAuthorChange(e){
		this.setState({ author: e.target.value});
		// alert(`!!! Author incoming! ${e.target.value}`);

	}

	handleTextChange(e){
		this.setState({ text : e.target.value });
		// alert(`!!! Someone's been typing ${e.target.value}`);
	}

	handleSubmit(e){
		e.preventDefault();
		console.log(`${this.state.author} said this "${this.state.text}"`);
		let author = this.state.author.trim();
		let text = this.state.text.trim();
		if (!text || !author){
			console.log('You got no text or author pham');
			return;
		}
		this.props.onCommentSubmit({ author : author, text: text});
		this.setState({author:`` , text: `` });
		//To be used in a post method
	}
	render() {
		return (
			 <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
			 
			 <input type = 'text' placeholder = 'Your name...' 
			 style = { style.commentFormAuthor }
			 value = { this.state.author}
			 onChange = {this.handleAuthorChange} />

			 <input type = 'text' placeholder = 'Say something...' 
			 style={ style.commentFormText}
			 value={ this.state.text }
			 onChange={ this.handleTextChange } />

			 <input type = 'submit' style = { style.commentFormPost }
			 value = 'Post' />

			</form>
		)
	}
}

export default CommentForm