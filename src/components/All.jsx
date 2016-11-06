import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import actions from '../actions/actions';
import store from '../stores/store';

import Offer_item from'./micro/Offer_item.jsx'
import './All.css';

function getStateFromFlux() {
    return {
			products: store.getProducts()
		};
};

	var All = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState() {
	    	return {
	    		products: store.getProducts()
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
			let { products } = this.state,
				prod = [];
				for (let p of products)
					prod.push(<Offer_item key={p.id} product={{p}}/>);

			return 	<div className="asd">
						{prod}
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }

	});

	

export default All;