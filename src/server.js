const express = require('express');

// Import routes and middleware
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Load the data from JSON files
// Note: We keep reviews here for now, but they can be refactored later.
const { reviews } = require('../data/reviews.json');
const { books } = require('../data/books.json');

const app = express();

// Define the port. Use the environment variable if available, otherwise default to 3000.
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies. This will be useful for POST and PUT requests later.
app.use(express.json());

// --- API Endpoints ---

// A simple root endpoint to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Welcome to the Amana Bookstore API!');
});

// Use the book routes for any request to /api/books
app.use('/api/books', bookRoutes);


/**
//  * @api {get} /api/reviews Get all reviews
//  * @description Retrieves a list of all reviews for all books.
//  */
// app.get('/api/reviews', (req, res) => {
//   res.json(reviews);
// });

// /**
//  * @api {get} /api/reviews/book/:bookId Get reviews for a specific book
//  * @description Retrieves all reviews associated with a specific book ID.
//  * @param {string} bookId The unique ID of the book.
//  */
// app.get('/api/reviews/book/:bookId', (req, res) => {
//   const { bookId } = req.params;
//   const bookReviews = reviews.filter(r => r.bookId === bookId);

//   // Check if the book exists to provide a more accurate response
//   const bookExists = books.some(b => b.id === bookId);

//   if (bookExists) {
//     res.json(bookReviews); // Returns reviews or an empty array if none exist
//   } else {
//     res.status(404).json({ message: `Cannot fetch reviews because book with ID ${bookId} does not exist.` });
//   }
// });


// GET /api/books/featured - Get featured books
// This must be defined before the /:id route


// Use the custom error handler middleware. This should be the last middleware.
app.use(errorHandler);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});