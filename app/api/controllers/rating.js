const Rating = require('./../models/ratings');
const Product = require('./../models/products');
const User = require('./../models/users');
const mongoose = require('mongoose');

module.exports = {
    addRating: async (req, res) => {
        const { rating } = req.body;
        const { userId, productId } = req.params;

        try {
            let isRentedProduct = await User.findOne({ rentedProducts : productId , _id: userId }).lean().exec();
            
            if(!isRentedProduct) {
                return res.status(400).json({message: `Can't rate product which you have not rented`}); 
            }

            const ratingDoc = await Rating.findOneAndUpdate({ productId, userId }, { productId, userId, rating }, { upsert: true }).exec();
            return res.json({ status: "success", message: "Rating added successfully!", data: ratingDoc });

        } catch (err) {
            return res.status(400).json(err);
        }
    },

    getProductIndividualRating: async (req, res) => {
        const { productId } = req.params;
        try {
            let result = await Rating.aggregate([
                { $match: { productId: mongoose.Types.ObjectId(productId) } },
                {
                    $group: {
                        _id: '$rating',
                        count: { $sum: 1 }
                    }
                }]).allowDiskUse(true).exec();

            let product = await Product.findOne({ _id: mongoose.Types.ObjectId(productId) }).lean().exec();

            let lookup = result.reduce((r, o) => {
                r[o._id] = o.count;
                return r;
            }, {});
           
            result = [1, 2, 3, 4, 5].map(rating => ({
                rating: rating,
                count: lookup[rating] || 0,
                name: product.name,
                price: product.price
            }));
            
            return res.json(result);
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    getUserRating: async (req, res) => {
        const { userId } = req.params;

        try {
            const result = await Rating.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(userId) } },
                {
                    $project: {
                        averageUserRating: { $avg: "$rating" },
                        userId: "$userId"
                    }
                },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
                }, {
                    $unwind: "$user"
                },
                {
                    $project: {
                        averageUserRating: '$averageUserRating',
                        userId: '$userId',
                        userName: '$user.name',
                        userEmail: '$user.email'
                    }
                }
            ]).allowDiskUse(true).exec();

            return res.json({
                status: "success",
                message: "Average Rating",
                data: result
            });
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    getProductRating: async (req, res) => {
        try {
            const { productId } = req.params;
            const result = await Rating.aggregate([
                { $match: { productId: mongoose.Types.ObjectId(productId) } },
                {
                    $project: {
                        averageProductRating: { $avg: "$rating" },
                        productId: "$productId"
                    }
                }, {
                    $lookup:
                    {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product"
                    }
                }, {
                    $unwind: "$product"
                },
                {
                    $project: {
                        averageProductRating: '$averageProductRating',
                        productId: '$productId',
                        productName: '$product.name',
                        productDescription: '$product.description',
                        productPrice: '$product.price'
                    }
                }
            ]).allowDiskUse(true).exec();

            return res.json({
                status: "success",
                message: "Average Rating",
                data: result
            });
        } catch (err) {
            return res.status(400).json(err);
        }
    }


}