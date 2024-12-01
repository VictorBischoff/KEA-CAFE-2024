const config = require('./index');

const corsOptions = {
  origin: process.env.NODE_ENV === 'development' 
    ? '*'
    : process.env.CORS_WHITELIST?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = corsOptions;