const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/books - Get all books
router.get('/', bookController.getAllBooks);

// GET /api/books/featured - Get featured books
// This must be defined before the /:id route
router.get('/featured', bookController.getFeaturedBooks);
// GET /api/books/search - Search for books
// This must be defined before the /:id route
router.get('/search', bookController.searchBooks);

// GET /api/books/:id - Get a specific book by its ID
router.get('/:id', bookController.getBookById);





router.post('/', bookController.addBook);


// PUT route - Update a book
router.put('/:id', bookController.updateBook);


module.exports = router;