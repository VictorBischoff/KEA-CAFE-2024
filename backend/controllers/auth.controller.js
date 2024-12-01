const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  // Generate token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { user, token }
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Update last login
  await user.update({ lastLogin: new Date() });

  // Remove password from output
  user.password = undefined;

  res.json({
    status: 'success',
    data: { user, token }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('You are not logged in', 401);
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new AppError('User no longer exists', 401);
  }

  // Grant access
  req.user = user;
  next();
});