const mongoose = require('mongoose');
const {Schema} = mongoose;

const Product = require('./products');
const User = require('./users');

const RatingSchema = new Schema({
    productId: { type: mongoose.Schema.ObjectId, ref: Product },
    userId: { type: mongoose.Schema.ObjectId, ref: User },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Rating', RatingSchema)