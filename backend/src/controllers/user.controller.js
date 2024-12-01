const { User, Cafe, Review, Favorite } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseHandler = require('../utils/responseHandler');
const ValidationUtils = require('../utils/validationUtils');
const APIFeatures = require('../utils/apiFeatures');

exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Cafe,
        as: 'favoriteCafes',
        include: ['amenities']
      },
      {
        model: Review,
        as: 'reviews',
        include: ['cafe']
      }
    ]
  });

  return ResponseHandler.success(res, user);
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { password, email, role, ...updateData } = req.body;
  
  // Don't allow password updates through this endpoint
  if (password) {
    throw new AppError('This route is not for password updates', 400);
  }

  // Don't allow role updates through this endpoint
  if (role) {
    throw new AppError('Role cannot be updated through this endpoint', 400);
  }

  // Check email uniqueness if being updated
  if (email) {
    const existingUser = await User.findOne({ 
      where: { 
        email: ValidationUtils.sanitizeEmail(email)
      } 
    });
    
    if (existingUser && existingUser.id !== req.user.id) {
      throw new AppError('Email already in use', 400);
    }
  }

  // Sanitize input data
  const sanitizedData = {
    ...updateData,
    email: email ? ValidationUtils.sanitizeEmail(email) : undefined,
    username: updateData.username ? ValidationUtils.sanitizeString(updateData.username) : undefined
  };

  await req.user.update(sanitizedData);
  
  // Remove password from response
  const updatedUser = req.user.toJSON();
  delete updatedUser.password;

  return ResponseHandler.success(res, updatedUser);
});

exports.deleteProfile = catchAsync(async (req, res) => {
  await req.user.destroy();
  return ResponseHandler.success(res, null, 204);
});

exports.getUserFavorites = catchAsync(async (req, res) => {
  const features = new APIFeatures(Favorite, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: favorites, count: total } = await Favorite.findAndCountAll({
    ...features.getQuery(),
    where: { userId: req.user.id },
    include: [{
      model: Cafe,
      as: 'cafe',
      include: ['amenities']
    }]
  });

  return ResponseHandler.paginated(res, {
    data: favorites,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.getUserReviews = catchAsync(async (req, res) => {
  const features = new APIFeatures(Review, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: reviews, count: total } = await Review.findAndCountAll({
    ...features.getQuery(),
    where: { userId: req.user.id },
    include: [{
      model: Cafe,
      as: 'cafe',
      attributes: ['id', 'name', 'address', 'city']
    }]
  });

  return ResponseHandler.paginated(res, {
    data: reviews,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

// Admin only controllers
exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: users, count: total } = await User.findAndCountAll({
    ...features.getQuery(),
    attributes: { exclude: ['password'] }
  });

  return ResponseHandler.paginated(res, {
    data: users,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Cafe,
        as: 'favoriteCafes',
        include: ['amenities']
      },
      {
        model: Review,
        as: 'reviews',
        include: ['cafe']
      }
    ]
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return ResponseHandler.success(res, user);
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { password, ...updateData } = req.body;

  // Don't allow password updates through this endpoint
  if (password) {
    throw new AppError('This route is not for password updates', 400);
  }

  // Sanitize input data
  const sanitizedData = {
    ...updateData,
    email: updateData.email ? ValidationUtils.sanitizeEmail(updateData.email) : undefined,
    username: updateData.username ? ValidationUtils.sanitizeString(updateData.username) : undefined
  };

  await user.update(sanitizedData);

  // Remove password from response
  const updatedUser = user.toJSON();
  delete updatedUser.password;

  return ResponseHandler.success(res, updatedUser);
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await user.destroy();
  return ResponseHandler.success(res, null, 204);
});

exports.getUserStats = catchAsync(async (req, res) => {
  const userId = req.params.id || req.user.id;

  const stats = {
    reviewsCount: await Review.count({ where: { userId } }),
    favoritesCount: await Favorite.count({ where: { userId } }),
    averageRating: await Review.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
      ],
      where: { userId }
    })
  };

  return ResponseHandler.success(res, stats);
});