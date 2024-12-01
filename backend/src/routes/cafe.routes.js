const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafe.controller');
const reviewController = require('../controllers/review.controller'); // Add this
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { cafeValidation } = require('../config/validation');

// Public routes
router.get('/', cafeController.getAllCafes);
router.get('/search', cafeController.searchCafes);
router.get('/:id', cafeController.getCafe);
router.get('/:cafeId/reviews', reviewController.getCafeReviews); // Use review controller
router.get('/:cafeId/amenities', cafeController.getCafeAmenities);

// Protected routes
router.use(authController.protect);

// Cafe CRUD operations
router.post('/',
  validate(cafeValidation.create),
  cafeController.createCafe
);

router.put('/:id',
  validate(cafeValidation.update),
  cafeController.updateCafe
);

router.delete('/:id', cafeController.deleteCafe);

// Protected amenity operations
router.post('/:cafeId/amenities',
  validate(cafeValidation.amenities),
  cafeController.addCafeAmenities
);

router.delete('/:cafeId/amenities/:amenityId',
  cafeController.removeCafeAmenity
);

module.exports = router;