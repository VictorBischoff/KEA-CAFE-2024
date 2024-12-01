const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { reviewValidation } = require('../config/validation');

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/cafe/:cafeId', reviewController.getCafeReviews);  // Make sure this comes before /:id
router.get('/:id', reviewController.getReview);

// Protected routes
router.use(authController.protect);

router.post('/', 
  validate(reviewValidation.create),
  reviewController.createReview
);

router.put('/:id', 
  validate(reviewValidation.update),
  reviewController.updateReview
);

router.delete('/:id', reviewController.deleteReview);

// The route causing the error - use createReview instead of createCafeReview
router.post('/cafe/:cafeId', 
  validate(reviewValidation.create),
  reviewController.createReview  // Changed from createCafeReview to createReview
);

module.exports = router;