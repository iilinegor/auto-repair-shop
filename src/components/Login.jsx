import ReactDOM from 'react-dom';
import React from 'react';

import actions from '../actions/actions';
import store from '../stores/store';

function getStateFromFlux() {
    return {
			products: store.getProducts()
		};
};

	var Login = React.createClass({
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

	    handleName(event){
	    	this.setState({name : event.target.value});
	    	console.log(event.target.value);
	    },

	    handlePassword(event){
	    	this.setState({password : event.target.value});
	    	console.log(event.target.value);
	    },

	    handleSubmit(){
	    	alert(`Типа ${this.state.name} ${this.state.password}`);
	    },

		render() {	
			let { products } = this.state;
			return 	<div className="login">
						<input type="text" placeholder="Имя" onChange={this.handleName}/>
						<input type="text" placeholder="Пароль" onChange={this.handlePassword}/>
						<button onClick={this.handleSubmit}> Готово! </button>
					</div>
			
		},

	    _onChange() {
	        this.setState(getStateFromFlux());
	    }

	});

	

export default Login;