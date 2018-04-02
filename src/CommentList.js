//The list js file
import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

//I need to study this mapping feature, props, and anything component related
//Plus map
class CommentList extends Component{
	render(){
		let commentNodes = this.props.data.map(comment => {
			return(
				// _id is for our mongoDB
				// okay we have to have the uniqueID when creating the component
				// Will crash whenever there's an attempt to update the list

				//You can live without a key, but you have to have a uniqueID. How else will you track your child?

				//Hey you can completely ignore the last three commenets, as this pertains to deciding 
				//prop state on commentUpdate. I specifically said props.uniqueID (props being this comment)
				//Think back to your angular days
				<Comment 
				author = { comment.author } 
				uniqueID = {comment[`_id`]}
				key = { comment[`_id`]}

				onCommentUpdate = {this.props.onCommentUpdate}
				onCommentDelete = {this.props.onCommentDelete}
				>
					{ comment.text }
				</Comment>
			)
		});

		return (
			<div style = { style.CommentList }>
				{commentNodes}
			</div>
		);
	}
}

export default CommentList