import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const Actions = {
    loadUsers() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.listUsers()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                users: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },

    loadUser(id) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });

        api.getUser(id)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                users: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    },

    createUser(note) {
        api.createUser(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateUser(note) {
        api.updateUser(note)
        .then(() =>
            this.loadUsers()
        )
        .catch(err =>
            console.error(err)
        );
    },

    loadProducts() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRODUCT_REQUEST
        });

        api.listProducts()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_SUCCESS,
                products: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_FAIL,
                error: err
            })
        );
    },

    loadProduct(id) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRODUCT_REQUEST
        });

        api.getProduct(id)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_SUCCESS,
                products: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRODUCT_FAIL,
                error: err
            })
        );
    },

    createProduct(note) {
        api.createProduct(note)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteProduct(noteId) {
        api.deleteProduct(noteId)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default Actions;
