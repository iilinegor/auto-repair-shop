import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

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
			let prod = [];

			for (let p of products)
				prod.push(<Offer_item product={{p}}/>);
			console.log(this.state.users);
			if (this.state.users[0])
			return 	<div className="asd">
						<br/>
						<br/>
						<br/>
						<br/>
						{this.state.users[0].name}
					</div>
			else
				return 0;
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }

	});

	

export default Profile;