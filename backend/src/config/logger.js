const config = require('./index');

class Logger {
  static get levels() {
    return {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    };
  }

  static shouldLog(level) {
    const configLevel = config.logs.level.toUpperCase();
    return this.levels[level] <= this.levels[configLevel];
  }

  static formatMessage(level, message, extra = '') {
    const timestamp = new Date().toISOString();
    return `[${level}] ${timestamp} - ${message} ${extra}`.trim();
  }

  static info(message) {
    if (this.shouldLog('INFO')) {
      console.log(this.formatMessage('INFO', message));
    }
  }

  static error(message, error = '') {
    if (this.shouldLog('ERROR')) {
      const errorDetails = error instanceof Error ? error.stack : error.toString();
      console.error(this.formatMessage('ERROR', message, errorDetails));
    }
  }

  static warn(message) {
    if (this.shouldLog('WARN')) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  static debug(message) {
    if (this.shouldLog('DEBUG') && config.env === 'development') {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  static request(req) {
    if (this.shouldLog('DEBUG') && config.env === 'development') {
      this.debug(`${req.method} ${req.originalUrl}`);
    }
  }

  static response(res, duration) {
    if (this.shouldLog('DEBUG') && config.env === 'development') {
      this.debug(`Response Status: ${res.statusCode} - ${duration}ms`);
    }
  }
}

module.exports = Logger;