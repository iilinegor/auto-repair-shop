import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var CHANGE_EVENT = 'change';

let _products = [];
let _users = [];
let _loadingError = null;
let _isLoading = true;

function formatProduct(data) {
    return {
                id: data.id,
                _id: data._id,
                name: data.name,
                description: data.description,
                authorId: data.authorId,
                type: data.type,
                year: data.year,
                mark: data.mark,
                model: data.model,
                color: data.color,
                price: data.price,
                image: data.image,
                closed: data.closed  
    };
};

function formatUser(data) {
    return {
            id: data.id,
            email: data.email,
            phone: data.phone,
            password: data.password,
            name: data.name,
            lastName: data.lastName,
            description: data.description,
            photo: data.photo,
            location: data.location,
            rank: data.rank,
            starts: data.starts,
            registerAt: data.registerAt
    };
};

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getProducts() {
        return _products;
    },

    getProduct(id) {
        return _products[id];
    },

    getUsers() {
        return _users;
    },

    getUser(id) {
        return _users[id];
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_PRODUCT_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_SUCCESS: {
            _isLoading = false;
            _products = action.products.map( formatProduct );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }


        case AppConstants.LOAD_USER_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_SUCCESS: {
            _isLoading = false;
            _users = action.users.map( formatUser );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            //console.log('No such handler');
        }
    }
});

export default TasksStore;
