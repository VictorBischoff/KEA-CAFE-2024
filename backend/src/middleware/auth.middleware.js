const AppError = require('../utils/appError');
const AuthConfig = require('../config/auth');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  try {
    // 1) Check if token exists
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Please log in to access this resource', 401));
    }

    // 2) Verify token
    const decoded = AuthConfig.verifyToken(token);

    // 3) Check if user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // 4) Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

exports.isOwner = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findByPk(req.params.id);
      
      if (!resource) {
        return next(new AppError('Resource not found', 404));
      }

      if (resource.userId !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('You do not have permission to perform this action', 403));
      }

      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};