const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const database = require('../config/database');

const models = {};

// Read all model files and import them
fs.readdirSync(__dirname)
  .filter(file => 
    file.indexOf('.') !== 0 && 
    file !== 'index.js' && 
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(database.sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize: database.sequelize,
  Sequelize
};