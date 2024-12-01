const Logger = require('../config/logger');

const logRequest = (req, res, next) => {
  Logger.info(`${req.method} ${req.originalUrl}`);
  
  if (Object.keys(req.body).length > 0) {
    Logger.debug('Request Body:', req.body);
  }

  // Log response
  const originalSend = res.send;
  res.send = function (data) {
    Logger.debug(`Response Status: ${res.statusCode}`);
    return originalSend.call(this, data);
  };

  next();
};

module.exports = logRequest;