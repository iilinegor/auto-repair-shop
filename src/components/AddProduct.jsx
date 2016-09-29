import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import actions from '../actions/actions';
import store from '../stores/store';


	var AddProduct = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    handleName(event) {
	    	this.setState({ name : event.target.value });
	    },

		handlePrice(event) {
	    	this.setState({ price : event.target.value });
	    },

		handleImage(event) {
	    	this.setState({ image : event.target.value });
	    },

		handleDescroption(event) {
	    	this.setState({ description : event.target.value });
	    },

		handleType(event) {
	    	this.setState({ type : event.target.value });
	    },

		handleYear(event) {
	    	this.setState({ year : event.target.value });
	    },

		handleMark(event) {
	    	this.setState({ mark : event.target.value });
	    },

		handleModel(event) {
	    	this.setState({ model : event.target.value });
	    },

		handleColor(event) {
	    	this.setState({ color : event.target.value });
	    },

	    handleSubmit() {
	    	let { 	name,
					price,
					image,
					description,
					type,
					year,
					mark,
					model,
					color  } = this.state;

			let New = { name: name,
						price: price,
						image: image,
						description: description,
						type: type,
						year: year,
						mark: mark,
						model: model,
						color: color 	};

			actions.createProduct(New);
			this.context.router.push(`/all`);
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
			return 	<div>
						<p>Название</p>
						<input type="text" onChange={this.handleName}/>
						<p>Цена</p>
						<input type="text" onChange={this.handlePrice}/>
						<p>Фото</p>
						<input type="text" onChange={this.handleImage}/>
						<p>Описание</p>
						<input type="text" onChange={this.handleDescroption}/>
						<p>Тип товара</p>
						<input type="text" onChange={this.handleType}/>
						<p>Год выпуска автомобиля</p>
						<input type="text" onChange={this.handleYear}/>
						<p>Марка</p>
						<input type="text" onChange={this.handleMark}/>
						<p>Модель</p>
						<input type="text" onChange={this.handleModel}/>
						<p>Цвет</p>
						<input type="text" onChange={this.handleColor}/>

						<button onClick={this.handleSubmit}>Готово</button>
					</div>
			
		},

		_onChange() {
	        return true;
	    }
	});

	var All = React.createClass({
		render() {			
			return 	<div>
						<h1>Список</h1>
					</div>
			
		}
	});

export default AddProduct;