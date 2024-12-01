const { Sequelize } = require('sequelize');
const config = require('./index');

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
        logging: config.env === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection established successfully.');
      
      if (config.env === 'development') {
        await this.sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
      }
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  getInstance() {
    return this.sequelize;
  }
}

module.exports = new Database();