const { Sequelize } = require('sequelize');
const config = require('./index');
const Logger = require('./logger');

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      config.db.database,
      config.db.user,
      config.db.password,
      {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: (msg) => Logger.debug(msg),
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        dialectOptions: {
          dateStrings: true,
          typeCast: true
        },
        timezone: '+00:00'
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      Logger.info('Database connection established successfully');
      
      if (config.env === 'development') {
        await this.sequelize.sync({ alter: true });
        Logger.info('Database synchronized successfully');
      }
    } catch (error) {
      Logger.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.sequelize.close();
      Logger.info('Database connection closed successfully');
    } catch (error) {
      Logger.error('Error closing database connection:', error);
      throw error;
    }
  }

  getInstance() {
    return this.sequelize;
  }
}

module.exports = new Database();