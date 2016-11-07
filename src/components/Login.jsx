import ReactDOM from 'react-dom';
import React from 'react';

import actions from '../actions/actions';
import store from '../stores/store';

import './login.css';

function getStateFromFlux() {
	
    return {
				users: store.getUsers(),
				length: store.getUsers().length
		};
};


function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
};


var Login = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState: function() {
		    return {
				isKnown: -1,
				users: store.getUsers(),
				length: store.getUsers().length
			};
	    },

	    handleLogIn: function(event) {
	    	var currentPass = event.target.value;
	    	var { user } = this.state;
	    	if ( currentPass === user.password ){
	    		localStorage.setItem('userId', this.state.user.id);
	    		this.context.router.push(`/`);
	    		window.location.reload() ;
	    	};
	    },

	    handlePassCheck: function(event) {
	    	if (event.target.value === document.getElementById("firstPassword").value)
	    		this.setState({ password : event.target.value });
	    },

	    handleNewName(event) {
	    	this.setState({ name : event.target.value });
	    },

	    handleNewLastName(event) {
	    	this.setState({ lastName : event.target.value });
	    },

	    handleNewLocation(event) {
	    	this.setState({ location : event.target.value });
	    },

	    handleSubmit() {
	    	let { name, email, password, lastName, location, length } = this.state;
	    	let access = 3;
	    	
	    	if (length < 3) access = 0;
	    	if (name && email && password) {
	    		let newUser = {
	    			id: length,
	    			name : name,
	    			email : email,
	    			password : password,
	    			lastName: lastName,
	    			location: location,
	    			photo: "http://mediascapeproject.eu/images/user.png",
	    			access: access
	    		};
	    		console.log(newUser);
	    	this.setState({ userId : length});
    		actions.createUser(newUser);
    		localStorage.setItem('userId', newUser.id);
    		this.context.router.push(`/all`);
	    	};
	    },

	    handleCheck: function(event){
	    	var searchQuery = event.target.value.toLowerCase();
	    	var { isLoading, users } = this.state;
			let isKnown;
			let userId;
			var user;
			
			let domens = [".ru", ".kz", ".com", ".org"];
			for (var c = 0; c < 10; c++)
			{

				var isEmail = function(Query) {
					if (Query.indexOf("@") !== -1) {
						for (let dom of domens) {
							if (Query.indexOf(dom) !== -1) {
				 				//actions.inBase(Query);
								return true;
							};
						};
					};
					return false;
				 };

				 var inBase = function (email) {
			        for (let u of users)
						if (u.email === email) {
							userId = u.id;
							user = u;
							return true;
						}
					return false;
				 };

				if (isEmail(searchQuery)) {			
					if (inBase(searchQuery)){
						isKnown = 1;
						this.setState({ user : user, userId: userId});
					}
					else {
						isKnown = 0;
						this.setState({ email : searchQuery });
					};
				}
				else 
					isKnown = -1;

				
				this.setState({ isKnown: isKnown});
			};

	    },

	    componentDidMount: function() {
	        store.addChangeListener(this._onChange);
		},

		componentWillMount() {
	        actions.loadUsers();
	    },

	    componentWillUnmount() {
    		store.removeChangeListener(this._onChange);
	    },

	    handleLogoClick: function(){
	    	this.context.router.push(`/all`);
	    },

		render: function() {
			var { isKnown, user, isLoading, email } = this.state;
			
			switch ( isKnown ) {
				case -1: {
							return (
									<div className="auth_container">

										<div className="auth">
											<p className="first">Введите email</p>
											<input type="text" onChange={this.handleCheck} />
										</div>

									</div>
								);
						};

				case 0: {
							return (
								<div className="auth_container">


									<div className="auth">
										<p className="first">Кажется, мы не знакомы</p>
										<input type="text" onChange={this.handleCheck} />
										<p>Как Вас зовут?</p>
										<input type="text"onChange={this.handleNewName} />
										<p>Ваша фамилия</p>
										<input type="text"onChange={this.handleNewLastName} />
										<p>Из какого Вы города?</p>
										<input type="text"onChange={this.handleNewLocation} />
										<p>Придумайте пароль</p>
										<input type="password" id="firstPassword"/>
										<p>Закрепим </p>
										<input type="password" onChange={this.handlePassCheck} />				
										<button onClick={this.handleSubmit}>Поехали!</button>
									</div>

								</div>
							);
						};

				case 1: {
							return (
								<div className="auth_container">

									<div className="auth">
										<p className="first">Здравствуйте, {user.name}!</p>
										<input type="text" onChange={this.handleCheck} />
										<p>Введите пароль</p>
										<input type="password" onChange={this.handleLogIn} />
									</div>

								</div>
							);
						};	
			};	
		},

		_onChange() {
	        this.setState(getStateFromFlux());
	    }
});

	

export default Login;