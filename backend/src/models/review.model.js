module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: DataTypes.TEXT,
      noise_level: {
        type: DataTypes.ENUM('quiet', 'moderate', 'loud'),
        allowNull: false,
      },
      wifi_quality: DataTypes.INTEGER,
      power_outlets: {
        type: DataTypes.ENUM('none', 'limited', 'plenty'),
      },
    },
    {
      timestamps: true,
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.Cafe, {
      foreignKey: 'cafeId',
      as: 'cafe',
      onDelete: 'SET NULL', // Handle cascade actions
      onUpdate: 'CASCADE',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};