module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      notes: {
        type: DataTypes.TEXT
      }
    }, {
      timestamps: true
    });
  
    return Favorite;
  };