module.exports = (sequelize, DataTypes) => {
    const Amenity = sequelize.define('Amenity', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      icon: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.ENUM('basic', 'comfort', 'tech', 'food', 'other'),
        defaultValue: 'other'
      }
    }, {
      timestamps: true
    });
  
    Amenity.associate = (models) => {
      Amenity.belongsToMany(models.Cafe, {
        through: models.CafeAmenity,
        as: 'cafes'
      });
    };
  
    return Amenity;
  };