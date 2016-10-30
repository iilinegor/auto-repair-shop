import ReactDOM from 'react-dom';
import React from 'react';

import actions from '../../actions/actions';
import store from '../../stores/store';

import './Offer_item.css';

var Offer_item = React.createClass({

	    handleDelete(data) {
	    	console.log(data);
	    	actions.deleteProduct(data);
	    },

		render() {
			let p = this.props.product.p;
			return <div key={p._id} className="offer_item">
									<div className="offer_photo" style={{"backgroundImage" : `url(${p.image})`}}> </div>
									<p>name: {p.name}</p>
									<p>mark: {p.mark}</p>
									<p>model: {p.model}</p>
									<p>type: {p.type}</p>
									<button onClick={this.handleDelete.bind(null, p)}>Удалить</button>
									<br/>
							</div>
		}
	});

export default Offer_item;
