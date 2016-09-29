import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import actions from '../actions/actions';
import store from '../stores/store';

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

	    handleDelete(data) {
	    	console.log(data);
	    	actions.deleteProduct(data);
	    },

		render() {	
			let { products } = this.state,
				prod = [];
				console.log(products);
				for (let p of products)
					prod.push(<div key={p._id}>
									<img src={p.image} alt=""/>
									<p>name: {p.name}</p>
									<p>mark: {p.mark}</p>
									<p>model: {p.model}</p>
									<p>type: {p.type}</p>
									<button onClick={this.handleDelete.bind(null, p)}>Удалить</button>
									<br/>
							</div>);

			return 	<div className="asd">
						<ASd />
						{prod}
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }

	});

	var ASd = React.createClass({
		render() {			
			return 	<div>
						<h1>Список</h1>
					</div>
			
		}
	});

export default All;