module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: Sequelize.TEXT,
      noise_level: {
        type: Sequelize.ENUM('quiet', 'moderate', 'loud'),
        allowNull: false,
      },
      wifi_quality: Sequelize.INTEGER,
      power_outlets: {
        type: Sequelize.ENUM('none', 'limited', 'plenty'),
      },
      cafeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cafes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  },
};