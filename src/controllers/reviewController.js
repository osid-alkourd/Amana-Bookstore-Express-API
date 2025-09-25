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

module.exports = {
  getAllReviews,
  getReviewsByBookId,
};
