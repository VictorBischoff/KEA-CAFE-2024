require('dotenv').config();
const app = require('./src/app');
const database = require('./src/config/database');
const Logger = require('./src/config/logger');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  Logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  Logger.error(err.name, err.message);
  Logger.error(err.stack);
  process.exit(1);
});

class Server {
  constructor() {
    this.PORT = process.env.PORT || 3000;
    this.server = null;
  }

  async start() {
    try {
      // Connect to database
      await database.connect();
      Logger.info('Database connection successful');

      // Start server
      this.server = app.listen(this.PORT, () => {
        Logger.info(`
        ################################################
        🛡️  Server listening on port: ${this.PORT} 🛡️
        ################################################
        `);
      });

      // Handle unhandled rejections
      process.on('unhandledRejection', (err) => {
        Logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
        Logger.error(err.name, err.message);
        Logger.error(err.stack);
        
        // Graceful shutdown
        this.stop();
      });

      // Handle SIGTERM
      process.on('SIGTERM', () => {
        Logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
        this.stop();
      });

    } catch (error) {
      Logger.error('Unable to start server:', error);
      process.exit(1);
    }
  }

  async stop() {
    if (this.server) {
      // Close server
      this.server.close(async () => {
        Logger.info('💥 Server closed');
        
        try {
          // Disconnect from database
          await database.disconnect();
          Logger.info('Database disconnected');
          
          // Exit process
          process.exit(0);
        } catch (error) {
          Logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });
    }
  }
}

// Initialize and start server
const server = new Server();
server.start();

// For testing purposes
module.exports = server;