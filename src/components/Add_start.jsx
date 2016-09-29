import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import actions from '../actions/actions';
import store from '../stores/store';

var numeral = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let max = 0;


function getStateFromFlux() {
    return {
			products: store.getProducts()
		};
};

	var Add_start = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

	    getInitialState() {
	    	store.getProducts().filter((x) => {if (x.id > max) max = x.id});
	    	console.log(max + 1);
	    	return {
	    		products: store.getProducts(),
	    		id : (max + 1)
	    	};
	    },

	    handleName(event) {
	    	this.setState({ name : event.target.value });
	    },

		handlePrice(event) {
			if ( !isNaN(parseInt(event.target.value[event.target.value.length - 1])) ){
		    	this.setState({ price : parseInt(event.target.value) });
		    	console.log(event.target.value);
		    }
		    else {
		    	event.target.value = event.target.value.substr(0, event.target.value.length - 1);

		    	if (event.target.value === "")
		    		this.setState({ price : ""});
		    	console.log("event.target.value");
		    }
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
					color,
					id   } = this.state;

			let New = { id: id,
						name: name,
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

	    componentDidMount() {
	        store.addChangeListener(this._onChange);
	    },

	    componentWillUnmount() {
			store.removeChangeListener(this._onChange);
	    },

	    componentWillMount() {
	        actions.loadProducts();
	        actions.loadUsers();
	    },

	    handleDelete(id) {
	    	actions.deleteProduct(id);
	    },

		render() {	
			let { products, name } = this.state,
				prod = [];
				// console.log(products);
				for (let p of products)
					prod.push(<div key={p._id}>
									<p>name: {p.name}</p>
									<p>price: {p.price}</p>
									<p>id: {p._id}</p>
									<button onClick={this.handleDelete.bind(null, p._id)}>Удалить</button>
									<br/>
							</div>);

			return 	<div className="asd">
						<div className="checkbox">
							<label htmlFor="type_new">Новые</label>
							<input type="checkbox" id="type_new"/>						
						</div>

						<div className="checkbox">
							<label htmlFor="type_oficial">Официальные</label>
							<input type="checkbox" id="type_oficial"/>						
						</div>

									

						<br/>
						<input1 type="text" onChange={this.handleName} placeholder="Название"/>
						<br/>
						<input1 type="text" onChange={this.handlePrice} placeholder="Цена" value={this.state.price}/>
						<br/>
						<input1 type="text" onChange={this.handleImage} placeholder="Фото"/>
						<br/>
						<input1 type="text" onChange={this.handleDescroption} placeholder="Описание"/>
						<br/>
						<input1 type="text" onChange={this.handleType} placeholder="Тип товара"/>
						<br/>
						<div className="checkbox">
							<input type="text" onChange={this.handleMark} placeholder="Марка"/>
						</div>
						<div className="checkbox">
							<input type="text" onChange={this.handleModel} placeholder="Модель"/>
						</div>
						<div className="checkbox">
							<input type="text" onChange={this.handleYear} placeholder="Год выпуска автомобиля"/>
						</div>
						<br/>
						<br/>
						<input1 type="text" onChange={this.handleColor} placeholder="Цвет"/>
						<br/>
						<button onClick={this.handleSubmit}>Готово</button>		
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

export default Add_start;