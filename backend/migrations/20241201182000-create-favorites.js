module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      notes: Sequelize.TEXT,
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      CafeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cafes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Add a unique constraint for UserId and CafeId
    await queryInterface.addConstraint('Favorites', {
      fields: ['UserId', 'CafeId'], // Fields to apply the constraint on
      type: 'unique',
      name: 'unique_user_cafe_favorite', // Name of the constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Favorites', 'unique_user_cafe_favorite');
    await queryInterface.dropTable('Favorites');
  },
};