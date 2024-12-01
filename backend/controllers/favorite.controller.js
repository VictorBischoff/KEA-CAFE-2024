const { Favorite, Cafe } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.addFavorite = catchAsync(async (req, res) => {
  const { cafeId } = req.body;
  
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

  const favorite = await Favorite.create({
    userId: req.user.id,
    cafeId,
    notes: req.body.notes
  });

  res.status(201).json({
    status: 'success',
    data: favorite
  });
});

exports.removeFavorite = catchAsync(async (req, res) => {
  const { cafeId } = req.params;

  const favorite = await Favorite.findOne({
    where: {
      userId: req.user.id,
      cafeId
    }
  });

  if (!favorite) {
    throw new AppError('Favorite not found', 404);
  }

  await favorite.destroy();

  res.json({
    status: 'success',
    data: null
  });
})