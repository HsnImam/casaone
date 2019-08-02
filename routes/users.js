const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/user');
const RatingController = require('../app/api/controllers/rating');

router.post('/:userId/products/:productId/ratings', RatingController.addRating);
router.get('/:userId/ratings', RatingController.getUserRating);
router.post('/', UserController.addUser);
router.put('/:userId', UserController.rentProduct);
router.get('/', UserController.getUser);

module.exports = router;