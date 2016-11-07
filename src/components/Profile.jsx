import ReactDOM from 'react-dom';
import React from 'react';

import actions from '../actions/actions';
import store from '../stores/store';

import Offer_item from'./micro/Offer_item.jsx'

import "./Profile.css"

function getStateFromFlux() {
    return {
			products: store.getProducts(),
			users: store.getUsers()
		};
};

	var Profile = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState() {
	    	return {
				products: store.getProducts(),
				users: store.getUsers()
	    	};
	    },

	    componentWillMount() {
	        actions.loadProducts();
	        actions.loadUsers();
	    },

	    componentDidMount() {
	        store.addChangeListener(this._onChange);
	    },

	    componentWillUnmount() {
			store.removeChangeListener(this._onChange);
	    },

	    handleLogOut() {
	    	localStorage.setItem("userId", "-1");
	    	this.context.router.push(`/`);
	    	// this.forceUpdate();
	    	// this.context.router.refresh();
	    	window.location.reload() ;
	    },



		render() {	
			let { products, users } = this.state;
			let { id } =this.props.params;
			if (users.length > 0)
				return <div>
						<br/>
						<br/>
						<br/>
						<br/>
						<div className="profile_full">
							<div className="pic" style={{backgroundImage: "url(" + users[id].photo + ")"}}></div>
							<img1 src={users[id].photo} alt=""/>
							<div className="info">	
								<div className="field">	
									<b>Имя</b>
									{users[id].name}
								</div>

								<div className="field">	
									<b>Email</b>
									{users[id].email}
								</div>

								<div className="field">	
									<b>Город</b>
									{users[id].location}
								</div>

								<div className="field">	
									<b>С нами с</b>
									{users[id].registerAt.substr(4, 12)}
								</div>
								

							</div>

						</div>
								<button onClick={this.handleLogOut}>Выйти</button>

				</div>
			else 
				return <div>
						<br/>
						<br/>
						<br/>
						<br/>
						<h1>	asdasd</h1>
						<h1>	asdasd</h1>
						<h1>	asdasd</h1>
				</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }

	});

	

export default Profile;