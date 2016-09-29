import mongoose from "mongoose";

const Schema = mongoose.Schema;

var marketSchema = new Schema({
			    id: Number,
				name: String,
				description: String,
				authorId: Number,
				type: String,
				year: Number,
				mark: String,
				model: String,
				color: String,
				price: Number,
				image: [ String ],
				closed: Boolean 
			});

mongoose.model('market', marketSchema, 'market');