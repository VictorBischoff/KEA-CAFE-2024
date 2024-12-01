module.exports = (sequelize, DataTypes) => {
    const OpeningHours = sequelize.define('OpeningHours', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dayOfWeek: {
        type: DataTypes.ENUM(
          'monday', 
          'tuesday', 
          'wednesday', 
          'thursday', 
          'friday', 
          'saturday', 
          'sunday'
        ),
        allowNull: false
      },
      openTime: {
        type: DataTypes.TIME,
        allowNull: false
      },
      closeTime: {
        type: DataTypes.TIME,
        allowNull: false
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: true
    });
  
    OpeningHours.associate = (models) => {
      OpeningHours.belongsTo(models.Cafe, {
        foreignKey: 'cafeId',
        as: 'cafe'
      });
    };
  
    return OpeningHours;
  };