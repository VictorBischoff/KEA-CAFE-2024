const { Review, Cafe } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.cafeId);
  
  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  // Check if user already reviewed this cafe
  const existingReview = await Review.findOne({
    where: {
      userId: req.user.id,
      cafeId: req.params.cafeId
    }
  });

  if (existingReview) {
    throw new AppError('You have already reviewed this cafe', 400);
  }

  const review = await Review.create({
    ...req.body,
    userId: req.user.id,
    cafeId: req.params.cafeId
  });

  // Update cafe average rating
  const reviews = await Review.findAll({
    where: { cafeId: req.params.cafeId }
  });

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  await cafe.update({ avgRating });

  res.status(201).json({
    status: 'success',
    data: review
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const review = await Review.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });

  if (!review) {
    throw new AppError('Review not found or not authorized', 404);
  }

  await review.update(req.body);

  // Update cafe average rating
  const cafe = await Cafe.findByPk(review.cafeId);
  const reviews = await Review.findAll({
    where: { cafeId: review.cafeId }
  });

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  await cafe.update({ avgRating });

  res.json({
    status: 'success',
    data: review
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });

  if (!review) {
    throw new AppError('Review not found or not authorized', 404);
  }

  await review.destroy();

  // Update cafe average rating
  const cafe = await Cafe.findByPk(review.cafeId);
  const reviews = await Review.findAll({
    where: { cafeId: review.cafeId }
  });

  const avgRating = reviews.length ? 
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 
    0;
    
  await cafe.update({ avgRating });

  res.json({
    status: 'success',
    data: null
  });
});

exports.getCafeReviews = catchAsync(async (req, res) => {
  const reviews = await Review.findAll({
    where: { cafeId: req.params.cafeId },
    include: ['user']
  });

  res.json({
    status: 'success',
    results: reviews.length,
    data: reviews
  });
});