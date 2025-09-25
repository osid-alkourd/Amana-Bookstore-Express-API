const { books } = require('../../data/books.json');

/**
 * Retrieves all books.
 * @returns {Array} A list of all books.
 */
const getAllBooks = () => {
  return books;
};

/**
 * Retrieves a single book by its ID.
 * @param {string} id - The ID of the book to retrieve.
 * @returns {Object|null} The book object if found, otherwise null.
 */
const getBookById = (id) => {
  return books.find(b => b.id === id);
};

/**
 * Retrieves all featured books.
 * @returns {Array} A list of books where 'featured' is true.
 */
const getFeaturedBooks = () => {
  return books.filter(b => b.featured === true);
};

/**
 * Searches for books based on a query string.
 * The search is case-insensitive and checks the title, author, and description.
 * @param {string} query - The search term.
 * @returns {Array} A list of books that match the search query.
 */
const searchBooks = (query) => {
  if (!query) {
    return [];
  }
  const lowercasedQuery = query.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lowercasedQuery) ||
    book.author.toLowerCase().includes(lowercasedQuery) ||
    book.description.toLowerCase().includes(lowercasedQuery)
  );
};

module.exports = {
  getAllBooks,
  getBookById,
  getFeaturedBooks,
  searchBooks,
};