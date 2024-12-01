module.exports = (sequelize, DataTypes) => {
    const Cafe = sequelize.define('Cafe', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      website: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8)
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8)
      },
      avgRating: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5
        }
      },
      priceRange: {
        type: DataTypes.ENUM('$', '$$', '$$$', '$$$$'),
        defaultValue: '$$'
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.ENUM('active', 'closed', 'temporary_closed'),
        defaultValue: 'active'
      }
    }, {
      timestamps: true
    });
  
    Cafe.associate = (models) => {
      Cafe.belongsToMany(models.User, {
        through: models.Favorite,
        as: 'favoritedByUsers'
      });
      Cafe.hasMany(models.Review, {
        foreignKey: 'cafeId',
        as: 'reviews'
      });
      Cafe.hasMany(models.OpeningHours, {
        foreignKey: 'cafeId',
        as: 'openingHours'
      });
      Cafe.belongsToMany(models.Amenity, {
        through: models.CafeAmenity,
        as: 'amenities'
      });
    };
  
    return Cafe;
  };