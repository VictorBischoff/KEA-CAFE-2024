const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const corsOptions = require('./config/cors');
const errorMiddleware = require('./middleware/error.middleware');
const Logger = require('./config/logger');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compress responses
app.use(compression());

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    Logger.request(req);
    next();
  });
}

// API routes
app.use('/api', routes);

// Error handling
app.use(errorMiddleware);

module.exports = app;