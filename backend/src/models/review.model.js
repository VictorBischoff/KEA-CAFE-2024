module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      content: {
        type: DataTypes.TEXT
      },
      noise_level: {
        type: DataTypes.ENUM('quiet', 'moderate', 'loud'),
        allowNull: false
      },
      wifi_quality: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      },
      power_outlets: {
        type: DataTypes.ENUM('none', 'limited', 'plenty')
      }
    }, {
      timestamps: true
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Review.belongsTo(models.Cafe, {
        foreignKey: 'cafeId',
        as: 'cafe'
      });
    };
  
    return Review;
  };