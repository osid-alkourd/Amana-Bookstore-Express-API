/**
 * Centralized error handling middleware.
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;