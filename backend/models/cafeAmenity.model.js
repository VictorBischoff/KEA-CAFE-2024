module.exports = (sequelize, DataTypes) => {
    const CafeAmenity = sequelize.define('CafeAmenity', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      details: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: true
    });
  
    return CafeAmenity;
  };