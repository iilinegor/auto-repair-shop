import ReactDOM from 'react-dom';
import React from 'react';

import Masonry from 'react-masonry-component';

import actions from '../actions/actions';
import store from '../stores/store';


import './Main.css';

	var Main = React.createClass({
		contextTypes: {
	        router: React.PropTypes.object.isRequired
	    },

		render() {
			
			return 	<div>
							
							<div className="main-container">
								<div className="main-header"> 

								</div>
								<div className="main-form">
									<h1> Auto Repair Shop </h1>
									<h2> World Wide Community </h2>
									<p>Найдите покупателя в два клика</p>
								</div>

								<div className="main-focus">
										<div className="main-search">
											<input type="text"/>
											<input type="text"/>
											<button className="search-button"> Найти </button>							
										</div>
									</div>
							</div>	
							<div className="container">
								<div className="tiles">

								</div>	

								<h2><strong>Специально для вас</strong></h2>
								<h3>Подборка товаров для Вашего автомобиля</h3>
								<div className="tiles">

								</div>	
								<h2><strong>Только в эти выходные</strong></h2>
								<h3>Самые горячие предложения</h3>
								<div className="tiles">
								</div>	
							</div>
					</div>	
		}
	});

export default Main;