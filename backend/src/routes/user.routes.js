const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { userValidation } = require('../config/validation');

// Protected routes - all user routes require authentication
router.use(authController.protect);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile',
  validate(userValidation.updateProfile),
  userController.updateProfile
);
router.delete('/profile', userController.deleteProfile);

// User specific routes
router.get('/favorites', userController.getUserFavorites);
router.get('/reviews', userController.getUserReviews);

// Admin only routes - apply restrictTo middleware to each route
router.get('/', authController.restrictTo('admin'), userController.getAllUsers);
router.get('/:id', authController.restrictTo('admin'), userController.getUser);
router.put('/:id', 
  authController.restrictTo('admin'),
  validate(userValidation.updateUser), 
  userController.updateUser
);
router.delete('/:id', authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;