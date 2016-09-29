import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Market';
import '../models/User';


const Market = mongoose.model('market');
const User = mongoose.model('user');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);    
}

export function listProducts(id) {
    return Market.find().sort({ id : 1});
}

export function getProduct(id) {
    return Market.find({ id : id }).sort({ id : 1});
}

    export function listUsers(id) {
        return User.find().sort({ id : 1});
    }

    export function getUser(id) {
        return User.find({ id : id }).sort({ id : 1});
    }


export function createUser(data) {
    const user = new User({
            id: data.id,
            email: data.email,
            password: data.password,
            name: data.name,
            lastName: data.lastName,
            description: data.description,
            photo: data.photo,
            location: data.location,
            order: data.order,
            basket: data.basket,
            likes: data.likes,
            delivery: data.delivery,
            pay: data.pay,
            access: data.access,
            registerAt: Date()
    });
    return user.save();
}

export function updateUser(data) {
    return User.update( { "id" : data.id } , { 
        $set: { "password": data.password , 
        "name": data.name , 
        "lastName": data.lastName , 
        "description": data.description , 
        "photo": data.photo , 
        "location": data.location , 
        "pay": data.pay , 
        "delivery": data.delivery } },
        { upsert: true }, function(err, doc){ } 
    );
}

export function createProduct(data) {
    const product = new Market({
                id: data.id,
                name: data.name ,
                description: data.description ,
                authorId: data.authorId ,
                type: data.type ,
                year: data.year ,
                mark: data.mark ,
                model: data.model ,
                color: data.color ,
                price: data.price ,
                image: data.image ,
                closed: false 
    });
    return product.save();
}


                


export function deleteProduct(data) {
    console.log(data.id);
    return Market.remove({ "id" : data.id, "name" : data.name});
}
