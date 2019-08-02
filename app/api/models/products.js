const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    description: { type: String, trim: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Product', ProductSchema)