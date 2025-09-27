const bookService = require('../services/bookService');

const getAllBooks = (req, res, next) => {
  try {
    const allBooks = bookService.getAllBooks();
    res.json(allBooks);
  } catch (error) {
    next(error);
  }
};

const getBookById = (req, res, next) => {
  try {
    const { id } = req.params;
    const book = bookService.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      // Create an error object and pass it to the error-handling middleware
      const error = new Error(`Book with ID ${id} not found.`);
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const getFeaturedBooks = (req, res, next) => {
  try {
    const featuredBooks = bookService.getFeaturedBooks();
    res.json(featuredBooks);
  } catch (error) {
    next(error);
  }
};

const searchBooks = (req, res, next) => {
  try {
    const { q } = req.query; // Search query from query parameter, e.g., /api/books/search?q=physics
    const results = bookService.searchBooks(q);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add a new book
 */
const addBook = (req, res, next) => {
  try {
    const {
      title,
      author,
      description,
      price,
      isbn,
      genre,
      tags,
      datePublished,
      pages,
      language,
      publisher,
      rating = 0,
      reviewCount = 0,
      inStock = true,
      featured = false,
    } = req.body;

    

    const newBookData = {
      title,
      author,
      description,
      price,
      isbn,
      genre,
      tags,
      datePublished,
      pages,
      language,
      publisher,
      rating,
      reviewCount,
      inStock,
      featured,
    };

    const newBook = bookService.addBook(newBookData);
    res.status(201).json(newBook);

  } catch (error) {
    next(error);
  }
};


const updateBook = (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = bookService.updateBook(id, updateData);

    if (!updatedBook) {
      return res.status(404).json({ message: `Book with ID ${id} not found` });
    }

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};





module.exports = {
  getAllBooks,
  getBookById,
  getFeaturedBooks,
  searchBooks,
  addBook,
  updateBook
};