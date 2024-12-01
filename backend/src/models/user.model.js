module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      lastLogin: {
        type: DataTypes.DATE
      }
    }, {
      timestamps: true
    });
  
    User.associate = (models) => {
      User.belongsToMany(models.Cafe, { 
        through: models.Favorite,
        as: 'favoriteCafes'
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'reviews'
      });
    };
  
    return User;
  };