const express = require('express');
const multer = require('multer');
const { logger, consoleLogger } = require('./middleware/logger'); // ✅ import

// Import routes and middleware
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // ✅ new

const errorHandler = require('./middleware/errorMiddleware');
    



const app = express();
const upload = multer();

// Define the port. Use the environment variable if available, otherwise default to 3000.
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies. This will be useful for POST and PUT requests later.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
app.use(upload.none());              // for form-data
app.use(logger);        // logs into log.txt
app.use(consoleLogger); // logs into console

// --- API Endpoints ---

// A simple root endpoint to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Welcome to the Amana Bookstore API!');
});

// Use the book routes for any request to /api/books
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes); // ✅ mount reviews route






app.use(errorHandler);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});