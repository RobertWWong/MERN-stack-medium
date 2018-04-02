import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

import style from './style'

// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

/*
Places to learn 
https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50
*/

ReactDOM.render(
	<CommentBox 
	url = 'http://localhost:3001/api/comments'
	pollInterval = {2000} />,
	document.getElementById('root')
);