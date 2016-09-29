import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import All from './components/All.jsx';
import Main from './components/Main.jsx';
import Host from './components/Host.jsx';
import Add_start from './components/Add_start.jsx';
import App from './App.jsx';

import './App.css';

ReactDOM.render(
			<Router history={hashHistory}>					
				
				<Route path="/" component={App}>
					<Route path="/all" component={All}/>
					<Route path="/main" component={Main}/>
					<Route path="/add" component={Add_start}/>
					<Route path="/host" component={Host}/>
				</Route>
			</Router>,
			document.getElementById("content")
		);

