import ReactDOM from 'react-dom';
import React from 'react';

import actions from '../actions/actions';
import store from '../stores/store';

import Offer_item from'./micro/Offer_item.jsx'

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


		render() {	
			let { products, users } = this.state;
			let { id } =this.props.params;
			let prod = [];

			for (let p of products)
				prod.push(<Offer_item product={{p}}/>);
			console.log(users);
			console.log(this.props.params.id);
			if (users.length > 0)
				return <div>
						<br/>
						<br/>
						<br/>
						<br/>
						<h1>	asdasd</h1>
						<h1>	asdasd</h1>
						<h1>	asdasd</h1>
						<h1>	{users[id].name}</h1>

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