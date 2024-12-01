const cors = require('cors');
const config = require('../config');

const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = config.cors.whitelist;
    
    if (config.env === 'development') {
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

module.exports = cors(corsOptions);