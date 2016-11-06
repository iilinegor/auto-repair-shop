import mongoose from "mongoose";

const Schema = mongoose.Schema;

var userSchema = new Schema({
			    id: Number,
				email: String,
				phone: Number,
				password: String,
				name: String,
				lastName: String,
				description: String,
				photo: String,
				location: String,
				rank: Number,
				starts: [
					{
						id: Number,
						events: Number
					}
				],
				registerAt: String
			});

mongoose.model('users', userSchema, 'users');