const { User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseHandler = require('../utils/responseHandler');
const PasswordUtils = require('../utils/passwordUtils');
const ValidationUtils = require('../utils/validationUtils');
const AuthConfig = require('../config/auth');

exports.register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ 
    where: { email: ValidationUtils.sanitizeEmail(email) }
  });
  
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  // Hash password and create user
  const hashedPassword = await PasswordUtils.hash(password);
  const user = await User.create({
    username: ValidationUtils.sanitizeString(username),
    email: ValidationUtils.sanitizeEmail(email),
    password: hashedPassword
  });

  // Generate token
  const token = AuthConfig.generateToken({ id: user.id });

  // Remove password from output
  user.password = undefined;

  return ResponseHandler.created(res, { user, token });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const user = await User.findOne({ 
    where: { email: ValidationUtils.sanitizeEmail(email) }
  });

  if (!user || !(await PasswordUtils.compare(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const token = AuthConfig.generateToken({ id: user.id });
  await user.update({ lastLogin: new Date() });

  // Remove password from output
  user.password = undefined;

  return ResponseHandler.success(res, { token, 
    user: { id: user.id, username: user.username, email: user.email }
   });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ 
    where: { email: ValidationUtils.sanitizeEmail(email) }
  });

  if (!user) {
    throw new AppError('No user found with this email', 404);
  }

  const { resetToken, hashedToken, tokenExpires } = PasswordUtils.generateResetToken();

  await user.update({
    passwordResetToken: hashedToken,
    passwordResetExpires: tokenExpires
  });

  // In production, send email with reset token
  // For development, just return the token
  return ResponseHandler.success(res, {
    message: 'Reset token sent to email',
    resetToken // Remove this in production
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;

  const hashedToken = PasswordUtils.hashToken(token);
  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: new Date() }
    }
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  user.password = await PasswordUtils.hash(newPassword);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  return ResponseHandler.success(res, {
    message: 'Password reset successful'
  });
});

exports.changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  if (!(await PasswordUtils.compare(currentPassword, user.password))) {
    throw new AppError('Current password is incorrect', 401);
  }

  user.password = await PasswordUtils.hash(newPassword);
  await user.save();

  return ResponseHandler.success(res, {
    message: 'Password changed successfully'
  });
});

exports.verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.params;
  const hashedToken = PasswordUtils.hashToken(token);

  const user = await User.findOne({
    where: {
      emailVerifyToken: hashedToken,
      emailVerifyExpires: { [Op.gt]: new Date() }
    }
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  user.isVerified = true;
  user.emailVerifyToken = null;
  user.emailVerifyExpires = null;
  await user.save();

  return ResponseHandler.success(res, {
    message: 'Email verified successfully'
  });
});

exports.logout = catchAsync(async (req, res) => {
  // In a real application, you might want to invalidate the token
  // This would require implementing a token blacklist or using refresh tokens
  return ResponseHandler.success(res, {
    message: 'Logged out successfully'
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Please log in to access this resource', 401);
  }

  const decoded = AuthConfig.verifyToken(token);
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new AppError('User no longer exists', 401);
  }

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action', 403);
    }
    next();
  };
};