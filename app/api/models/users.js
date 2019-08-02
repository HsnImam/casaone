const mongoose = require('mongoose');
const {Schema} = mongoose;
const Product = require('./products');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    rentedProducts: [{ type: mongoose.Schema.ObjectId, ref: Product }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('User', UserSchema)