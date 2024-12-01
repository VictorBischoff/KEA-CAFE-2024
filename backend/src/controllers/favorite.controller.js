const { Favorite, Cafe, User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseHandler = require('../utils/responseHandler');
const APIFeatures = require('../utils/apiFeatures');

exports.getUserFavorites = catchAsync(async (req, res) => {
  const features = new APIFeatures(Favorite, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: favorites, count: total } = await Favorite.findAndCountAll({
    ...features.getQuery(),
    where: { userId: req.user.id },
    include: [
      {
        model: Cafe,
        as: 'cafe',
        include: ['amenities']
      }
    ]
  });

  return ResponseHandler.paginated(res, {
    data: favorites,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.addFavorite = catchAsync(async (req, res) => {
  const cafeId = req.params.cafeId;
  
  // Check if cafe exists
  const cafe = await Cafe.findByPk(cafeId);
  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  // Check if already favorited
  const existingFavorite = await Favorite.findOne({
    where: {
      userId: req.user.id,
      cafeId
    }
  });

  if (existingFavorite) {
    throw new AppError('Cafe already in favorites', 400);
  }

  // Create favorite
  const favorite = await Favorite.create({
    userId: req.user.id,
    cafeId,
    notes: req.body.notes
  });

  // Fetch complete favorite data with cafe details
  const completeFavorite = await Favorite.findByPk(favorite.id, {
    include: [
      {
        model: Cafe,
        as: 'cafe',
        include: ['amenities']
      }
    ]
  });

  return ResponseHandler.created(res, completeFavorite);
});

exports.removeFavorite = catchAsync(async (req, res) => {
  const favorite = await Favorite.findOne({
    where: {
      userId: req.user.id,
      cafeId: req.params.cafeId
    }
  });

  if (!favorite) {
    throw new AppError('Favorite not found', 404);
  }

  await favorite.destroy();
  return ResponseHandler.success(res, null, 204);
});

exports.checkFavoriteStatus = catchAsync(async (req, res) => {
  const favorite = await Favorite.findOne({
    where: {
      userId: req.user.id,
      cafeId: req.params.cafeId
    }
  });

  return ResponseHandler.success(res, {
    isFavorite: !!favorite,
    favorite: favorite || null
  });
});

exports.getFavoritesByUser = catchAsync(async (req, res) => {
  // This endpoint is for admin use to view any user's favorites
  if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.userId)) {
    throw new AppError('Not authorized to view these favorites', 403);
  }

  const features = new APIFeatures(Favorite, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: favorites, count: total } = await Favorite.findAndCountAll({
    ...features.getQuery(),
    where: { userId: req.params.userId },
    include: [
      {
        model: Cafe,
        as: 'cafe',
        include: ['amenities']
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email']
      }
    ]
  });

  return ResponseHandler.paginated(res, {
    data: favorites,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.getFavoriteCounts = catchAsync(async (req, res) => {
  // Get favorite counts for cafes (useful for analytics)
  const favoriteCounts = await Favorite.findAll({
    attributes: [
      'cafeId',
      [sequelize.fn('COUNT', sequelize.col('id')), 'favoriteCount']
    ],
    group: ['cafeId'],
    include: [
      {
        model: Cafe,
        as: 'cafe',
        attributes: ['name']
      }
    ]
  });

  return ResponseHandler.success(res, favoriteCounts);
});