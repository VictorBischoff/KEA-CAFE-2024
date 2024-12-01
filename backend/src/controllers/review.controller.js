const { Review, Cafe, User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseHandler = require('../utils/responseHandler');
const APIFeatures = require('../utils/apiFeatures');
const ValidationUtils = require('../utils/validationUtils');

const updateCafeRating = async (cafeId) => {
  const reviews = await Review.findAll({
    where: { cafeId }
  });

  const avgRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  await Cafe.update(
    { avgRating: parseFloat(avgRating.toFixed(1)) },
    { where: { id: cafeId } }
  );

  return avgRating;
};

exports.getAllReviews = catchAsync(async (req, res) => {
  const features = new APIFeatures(Review, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: reviews, count: total } = await Review.findAndCountAll({
    ...features.getQuery(),
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      },
      {
        model: Cafe,
        as: 'cafe',
        attributes: ['id', 'name']
      }
    ]
  });

  return ResponseHandler.paginated(res, {
    data: reviews,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.getReview = catchAsync(async (req, res) => {
  const review = await Review.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      },
      {
        model: Cafe,
        as: 'cafe',
        attributes: ['id', 'name']
      }
    ]
  });

  if (!review) {
    throw new AppError('Review not found', 404);
  }

  return ResponseHandler.success(res, review);
});

exports.createReview = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.cafeId);
  
  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  // Check for existing review
  const existingReview = await Review.findOne({
    where: {
      userId: req.user.id,
      cafeId: req.params.cafeId
    }
  });

  if (existingReview) {
    throw new AppError('You have already reviewed this cafe', 400);
  }

  // Create review with sanitized content
  const review = await Review.create({
    ...req.body,
    content: req.body.content ? ValidationUtils.sanitizeString(req.body.content) : null,
    userId: req.user.id,
    cafeId: req.params.cafeId
  });

  // Update cafe rating
  await updateCafeRating(req.params.cafeId);

  // Fetch complete review data
  const completeReview = await Review.findByPk(review.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      },
      {
        model: Cafe,
        as: 'cafe',
        attributes: ['id', 'name']
      }
    ]
  });

  return ResponseHandler.created(res, completeReview);
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

  // Update review with sanitized content
  const updatedReview = await review.update({
    ...req.body,
    content: req.body.content ? ValidationUtils.sanitizeString(req.body.content) : review.content
  });

  // Update cafe rating
  await updateCafeRating(review.cafeId);

  const completeReview = await Review.findByPk(updatedReview.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      },
      {
        model: Cafe,
        as: 'cafe',
        attributes: ['id', 'name']
      }
    ]
  });

  return ResponseHandler.success(res, completeReview);
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

  const cafeId = review.cafeId;
  await review.destroy();
  
  // Update cafe rating
  await updateCafeRating(cafeId);

  return ResponseHandler.success(res, null, 204);
});

exports.getCafeReviews = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.cafeId);
  
  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  const features = new APIFeatures(Review, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: reviews, count: total } = await Review.findAndCountAll({
    ...features.getQuery(),
    where: { cafeId: req.params.cafeId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }
    ]
  });

  return ResponseHandler.paginated(res, {
    data: reviews,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});