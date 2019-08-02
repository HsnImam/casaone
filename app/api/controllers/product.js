const Product = require('./../models/products');

module.exports = {
    addProdcut : async (req, res) => {
        const {name, price, description} = req.body;
        try {
            const product = await new Product({name, price, description}).save();
            return res.json({status: "success", message: "Product added successfully!", data: product});
        } catch(err) {
            return res.status(400).json(err); 
        }
    }
}