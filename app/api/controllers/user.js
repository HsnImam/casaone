const User = require('./../models/users');
const Product = require('./../models/products');
const mongoose = require('mongoose');

module.exports = {
    addUser: async (req, res) => {
        let { email, name } = req.body;

        try {
            email = email.trim().toLowerCase();
            const user = await User.findOneAndUpdate({ email }, { email, name }, { upsert: true }).lean().exec();
            return res.json({ status: "success", message: "User added successfully!", data: user });
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    getUser: async (req, res) => {
        let { email } = req.query;
        try {
            email = email.toLowerCase();
            const user = await User.findOne({ email }).lean().exec();
            if (!user)
                return res.json({ status: 'failure', message: `User doesn't exist` });
            else
                return res.json({ status: "success", message: "User exist!", data: user });
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    rentProduct: async (req, res) => {
        let { userId } = req.params;
        let { productId } = req.body;

        try {
            const product = await Product.findOne({ _id: productId }).lean().exec();
            if (!product)
                return res.status(400).json({ message: "Product doesn't exist" });

            await User.updateOne({ _id: userId }, { $addToSet: { rentedProducts: product._id } }).exec();
            return res.json({ status: "success", message: "Item Rented successfully!" });
        } catch (err) {
            return res.status(400).json(err);
        }

    }
}