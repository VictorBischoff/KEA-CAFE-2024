const config = require('./index');

class Logger {
  static info(message) {
    if (config.env !== 'test') {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  }

  static error(message, error = '') {
    if (config.env !== 'test') {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
    }
  }

  static debug(message) {
    if (config.env === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }
}

module.exports = Logger;