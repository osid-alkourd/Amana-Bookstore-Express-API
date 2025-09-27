const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController')

// GET /api/reviews - Get all reviews
router.get('/', reviewController.getAllReviews);

// GET /api/reviews/book/:id - Get reviews for a specific book
router.get('/book/:id', reviewController.getReviewsByBookId);

// POST /reviews → add a new review
router.post("/", reviewController.createReview);

module.exports = router;
