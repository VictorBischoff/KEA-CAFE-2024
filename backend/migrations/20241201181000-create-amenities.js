module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Amenities', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        icon: Sequelize.STRING,
        category: {
          type: Sequelize.ENUM('basic', 'comfort', 'tech', 'food', 'other'),
          defaultValue: 'other',
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Amenities');
    },
  };