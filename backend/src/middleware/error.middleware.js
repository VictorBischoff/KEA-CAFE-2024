const AppError = require('../utils/appError');

const handleSequelizeUniqueConstraintError = (err) => {
  const message = `Duplicate value for ${err.errors[0].path}`;
  return new AppError(message, 400);
};

const handleSequelizeValidationError = (err) => {
  const message = err.errors.map(error => error.message).join('. ');
  return new AppError(message, 400);
};

const handleJWTError = () => 
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () => 
  new AppError('Your token has expired. Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError') 
      error = handleSequelizeUniqueConstraintError(error);
    if (error.name === 'SequelizeValidationError') 
      error = handleSequelizeValidationError(error);
    if (error.name === 'JsonWebTokenError') 
      error = handleJWTError();
    if (error.name === 'TokenExpiredError') 
      error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};