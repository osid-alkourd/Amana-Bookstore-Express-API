const { reviews } = require('../../data/reviews.json');
const { books } = require('../../data/books.json');    // FIX path
const fs = require("fs");
const path = require("path");
const reviewsFilePath = path.join(__dirname, "../../data/reviews.json");

const getAllReviews = () => {
  return reviews;
};


const getReviewsByBookId = (bookId) => {
  const bookExists = books.some(b => b.id === bookId);

  if (!bookExists) {
    return { exists: false, reviews: [] };
  }

  const bookReviews = reviews.filter(r => r.bookId === bookId);
  return { exists: true, reviews: bookReviews };
};


const addReview = (reviewData) => {
  // Generate new id (increment length for simplicity)
  const newId = `review-${reviews.length + 1}`;

  const newReview = {
    id: newId,
    ...reviewData,
    timestamp: new Date().toISOString(), // auto-generate timestamp
  };

  reviews.push(newReview); // in-memory only

  // Save updated reviews array back to reviews.json
  fs.writeFileSync(reviewsFilePath, JSON.stringify({ reviews }, null, 2), "utf-8");

  return newReview;
};


module.exports = {
  getAllReviews,
  getReviewsByBookId,
  addReview
};

