module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  Favorite.associate = (models) => {
    // Associate Favorite with Cafe
    Favorite.belongsTo(models.Cafe, {
      foreignKey: 'CafeId',
      as: 'cafe',
    });

    // Associate Favorite with User
    Favorite.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };

  return Favorite;
};