import ReactDOM from 'react-dom';
import React from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone'

import { apiPrefix } from '../../../etc/config.json';

import actions from '../../actions/actions';
import store from '../../stores/store';


let max = 0;
let tmpPhoto;


function  additional_close(){
				var buttons = document.getElementsByClassName("Additional_active");
					for(var i = 0; i < buttons.length; ++i)
					    buttons[i].setAttribute("class", "Additional");
			};


function getStateFromFlux(userId) {
    			store.getProducts().filter((x) => {if (x.id > max) max = x.id});
			    return {
						products: store.getProducts(),
						user: store.getUser(parseInt(userId)),
						userId: userId,
						id: max + 1,
					};
			};


var Additional = React.createClass({
	contextTypes: {
        router: React.PropTypes.object.isRequired
    },

	getInitialState() {
    	store.getProducts().filter((x) => {if (x.id > max) max = x.id});

    	console.log(max + 1);
    	return {
    		products: store.getProducts(),
    		id : (max + 1),
    		addMode: false
    	};
    },

	handleName(event) {
    	this.setState({ name : event.target.value });
    },

	handlePrice(event) {
		if ( !isNaN(parseInt(event.target.value[event.target.value.length - 1])) ){
	    	this.setState({ price : parseInt(event.target.value) });
	    }
	    else {
	    	event.target.value = event.target.value.substr(0, event.target.value.length - 1);
	    	if (event.target.value === "")
	    		this.setState({ price : ""});
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
		// console.log(event.target.value);
    	this.setState({ mark : event.target.value });
    },

	handleModel(event) {
    	this.setState({ model : event.target.value });
    },

	handleColor(event) {
    	this.setState({ color : event.target.value });
    },

    handleSubmit() {

    	if (this.state.addMode) {
	    	let { 	name,
					price,
					photo,
					description,
					type,
					year,
					mark,
					model,
					color,
					id   } = this.state;
			(photo === undefined) ? photo = "http://chertezhi.ru/modules/ukrfiles/cache/shots/Diplomn-kursovoy/Avtomob-otrasl/gd-man.jpg" 
									: 1;
			let New = { id: id,
						name: this.props.name,
						price: price,
						image: photo,
						description: description,
						type: type,
						year: year,
						mark: mark,
						model: model,
						color: color 	};

			actions.createProduct(New);
			additional_close();
			this.setState({ addMode: false });
			this.context.router.push(`/all`);
		}
		else
		{
			this.setState({ addMode: true });
		}
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

	handleOffer() {
		this.context.router.push(`/all`);
		additional_close();
	},

	handleClose() {
		additional_close();
	},

	handlePushPhoto(number, event) {
		this.setState({ photo : event.target.value });
	},

	render() {
		let detail = [];

		var componentConfig = {
		    iconFiletypes: ['.jpg', '.png', '.gif'],
		    showFiletypeIcon: true,
		    postUrl: `${apiPrefix}/upload`
		};

		var djsConfig = {
		    addRemoveLinks: true,
		    acceptedFiles: "image/jpeg,image/png,image/gif"
		};

		function sucRes(props, res){
			tmpPhoto = res.responseText;
			scope.setState({ photo : tmpPhoto });
			console.log(res.responseText);
		};

		var scope = this;

		var eventHandlers = {
		    success: sucRes
		};






		if (this.state.addMode){
			detail.push(<DropzoneComponent key={3}
								config={componentConfig}
		                    	eventHandlers={eventHandlers}
		                    	djsConfig={djsConfig} />);
			detail.push(<input key={2} type="text" id="comment" onChange={this.handleName} placeholder="Коментарий"/>);
			// detail.push(<input type="text" onChange={this.handleName} placeholder="Цвет"/>);
			detail.push(<br key={1}/>);


		};
		return <div className="Additional">
						<div className="close" onClick={this.handleClose}>⨉</div>
						<div className="checkbox">
							<label htmlFor="type_new">Новые</label>
							<input type="checkbox" id="type_new"/>						
						</div>

						<div className="checkbox">
							<label htmlFor="type_oficial">Официальные</label>
							<input type="checkbox" id="type_oficial"/>						
						</div>

						<br/>

							<input type="text" onChange={this.handleMark} placeholder="Марка"/>
						
							<input type="text" onChange={this.handleModel} placeholder="Модель"/>
						
							<input type="text" onChange={this.handleYear} placeholder="Год выпуска автомобиля"/>
					
						<br/>
						{detail}
						<br/>
						<button onClick={this.handleSubmit}>Разместить</button>	
						<button onClick={this.handleOffer}>Найти</button>	
		</div>
	},

    _onChange() {
        this.setState(getStateFromFlux());
    }
}); 



export default Additional;