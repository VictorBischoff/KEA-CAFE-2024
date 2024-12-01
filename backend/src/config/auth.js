const config = require('./index');
const jwt = require('jsonwebtoken');

class AuthConfig {
  static generateToken(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static get passwordConfig() {
    return {
      saltRounds: 10,
      minLength: 8
    };
  }
}

module.exports = AuthConfig;