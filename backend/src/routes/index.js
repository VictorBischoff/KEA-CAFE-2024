const express = require('express');
const router = express.Router();
const AppError = require('../utils/appError');
const Logger = require('../config/logger');

// Import routes
const authRoutes = require('./auth.routes');
const cafeRoutes = require('./cafe.routes');
const userRoutes = require('./user.routes');
const reviewRoutes = require('./review.routes');
const favoriteRoutes = require('./favorite.routes');

// API Version and prefix
const API_VERSION = '/v1';
const API_PREFIX = `/api${API_VERSION}`;

// Log API calls in development
if (process.env.NODE_ENV === 'development') {
  router.use((req, res, next) => {
    Logger.debug(`API Call: ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Mount routes
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/cafes`, cafeRoutes);
router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/reviews`, reviewRoutes);
router.use(`${API_VERSION}/favorites`, favoriteRoutes);

// Health check endpoint
router.get(`${API_VERSION}/health`, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

// Handle undefined routes
router.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = router;