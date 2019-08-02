const express = require('express');
const router = express.Router();
const productController = require('../app/api/controllers/product');
const RatingController = require('../app/api/controllers/rating');

router.post('/', productController.addProdcut);
router.get('/:productId/ratings', RatingController.getProductRating);
router.get('/:productId/ratings-individual', RatingController.getProductIndividualRating);

module.exports = router;