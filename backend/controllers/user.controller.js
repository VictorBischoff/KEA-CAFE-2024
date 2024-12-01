const { User, Cafe, Review } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Cafe,
        as: 'favoriteCafes'
      },
      {
        model: Review,
        as: 'reviews',
        include: ['cafe']
      }
    ]
  });

  res.json({
    status: 'success',
    data: user
  });
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { password, email, ...updateData } = req.body;
  
  // Don't allow password updates through this endpoint
  if (password) {
    throw new AppError('This route is not for password updates', 400);
  }

  // Check email uniqueness if being updated
  if (email) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== req.user.id) {
      throw new AppError('Email already in use', 400);
    }
  }

  await req.user.update(req.body);
  
  // Remove password from response
  req.user.password = undefined;

  res.json({
    status: 'success',
    data: req.user
  });
});

exports.deleteProfile = catchAsync(async (req, res) => {
  await req.user.destroy();

  res.json({
    status: 'success',
    data: null
  });
});

// Admin only
exports.getAllUsers = catchAsync(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new AppError('Not authorized', 403);
  }

  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });

  res.json({
    status: 'success',
    results: users.length,
    data: users
  });
});


// userlogin
