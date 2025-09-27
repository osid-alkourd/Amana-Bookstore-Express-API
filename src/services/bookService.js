const fs = require('fs');
const path = require('path');
const booksFilePath = path.join(__dirname, '../../data/books.json');

const { books } = require("../../data/books.json");

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
  return books.find((b) => b.id === id);
};

/**
 * Retrieves all featured books.
 * @returns {Array} A list of books where 'featured' is true.
 */
const getFeaturedBooks = () => {
  return books.filter((b) => b.featured === true);
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
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery) ||
      book.description.toLowerCase().includes(lowercasedQuery)
  );
};

const addBook = (bookData) => {
  // Generate new id (increment length for simplicity)
  const newId = (books.length + 1).toString();

  const newBook = {
    id: newId,
    ...bookData,
  };

  books.push(newBook); // in-memory only

  // Save updated books array back to books.json
  fs.writeFileSync(
    booksFilePath,
    JSON.stringify({ books }, null, 2),
    'utf-8'
  );

  return newBook;
};


const updateBook = (id, updateData) => {
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return null; // Book not found
  }

  // Merge updates into existing book
  books[bookIndex] = { ...books[bookIndex], ...updateData };

  // Persist changes back to books.json
  fs.writeFileSync(
    booksFilePath,
    JSON.stringify({ books }, null, 2),
    'utf-8'
  );

  return books[bookIndex];
};


module.exports = {
  getAllBooks,
  getBookById,
  getFeaturedBooks,
  searchBooks,
  addBook, 
  updateBook
};
