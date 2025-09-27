const reviewService = require("../services/reviewService");

const getAllReviews = (req, res, next) => {
  try {
    const allReviews = reviewService.getAllReviews();
    res.json(allReviews);
  } catch (error) {
    next(error);
  }
};

const getReviewsByBookId = (req, res, next) => {
  try {
    const { id } = req.params;
    const { exists, reviews } = reviewService.getReviewsByBookId(id);

    if (!exists) {
      return res.status(404).json({ message: `Book with ID ${id} not found` });
    }

    if (reviews.length === 0) {
      return res.json({ message: `Book with ID ${id} does not have reviews` });
    }

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const createReview = (req, res) => {
  const { bookId, author, rating, title, comment, verified } = req.body;

  if (!bookId || !author || !rating || !title || !comment) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newReview = reviewService.addReview({
      bookId,
      author,
      rating,
      title,
      comment,
      verified: true,
    });
    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add review", details: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewsByBookId,
  createReview,
};
