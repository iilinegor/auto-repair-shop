import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listProducts() {
        return axios.get(`${apiPrefix}/products`);
    },

    getProduct(productId) {
        return axios.get(`${apiPrefix}/products/${productId}`);
    },

    listUsers() {
        return axios.get(`${apiPrefix}/user`);
    },

    getUser(userId) {
        return axios.get(`${apiPrefix}/user/${userId}`);
    },

    createProduct(data) {
        return axios.post(`${apiPrefix}/products/new`, data);
    },

    createUser(data) {
        return axios.post(`${apiPrefix}/user/new`, data);
    },

    deleteProduct(data) {
        console.log(data);
        return axios.post(`${apiPrefix}/products/delete`, data);
    },

    updateUser(data) {
        return axios.post(`${apiPrefix}/user/update`, data);
    },
}
