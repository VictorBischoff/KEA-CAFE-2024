const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const authController = require('../controllers/auth.controller');

// All favorite routes require authentication
router.use(authController.protect);

// Favorite routes
router.get('/', favoriteController.getUserFavorites);
router.get('/check/:cafeId', favoriteController.checkFavoriteStatus); // Moved up
router.post('/:cafeId', favoriteController.addFavorite);
router.delete('/:cafeId', favoriteController.removeFavorite);

module.exports = router;