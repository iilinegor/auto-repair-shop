import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    db.listProducts().then(data => res.send(data));
});

app.post('/products/new', (req, res) => {
    db.createProduct(req.body).then(data => res.send(data));
});

app.post('/products/delete', (req, res) => {
    db.deleteProduct(req.body).then(data => res.send(data));
});

app.get('/products/:id', (req, res) => {
	db.getProduct(req.params.id).then(data => res.send(data));
	console.log(req.params.id);
});


//Отладочное, потом удалить! 
app.post('/user/new', (req, res) => {
    db.createUser(req.body).then(data => res.send(data));
});
app.get('/user', (req, res) => {
    db.listUsers().then(data => res.send(data));
});
app.get('/user/:id', (req, res) => {
	db.getUser(req.params.id).then(data => res.send(data));
	console.log(req.params.id);
});

app.post('/user/update', (req, res) => {
    db.updateUser(req.body).then(data => res.send(data));
});


const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});