const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Create a writable stream (append mode)
const logStream = fs.createWriteStream(
  path.join(__dirname, '../../log.txt'),
  { flags: 'a' }
);

// Setup morgan logger
// "combined" = standard Apache style log
const logger = morgan('combined', { stream: logStream });

// Also log to console for dev
const consoleLogger = morgan('dev');

module.exports = {
  logger,        // writes logs into log.txt
  consoleLogger, // writes logs into console
};
