const { reviews } = require('../../data/reviews.json');
const { books } = require('../../data/books.json');    // FIX path


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



module.exports = {
  getAllReviews,
  getReviewsByBookId
};

