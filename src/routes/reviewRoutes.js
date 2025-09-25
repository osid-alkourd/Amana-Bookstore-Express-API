const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')

// GET /api/reviews - Get all reviews
router.get('/', reviewController.getAllReviews);

// GET /api/reviews/book/:id - Get reviews for a specific book
router.get('/book/:id', reviewController.getReviewsByBookId);

module.exports = router;
