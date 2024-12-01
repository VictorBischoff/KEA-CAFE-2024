module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cafes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: Sequelize.TEXT,
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalCode: Sequelize.STRING,
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      website: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      latitude: Sequelize.DECIMAL(10, 8),
      longitude: Sequelize.DECIMAL(11, 8),
      avgRating: {
        type: Sequelize.DECIMAL(2, 1),
        defaultValue: 0,
      },
      priceRange: {
        type: Sequelize.ENUM('$', '$$', '$$$', '$$$$'),
        defaultValue: '$$',
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'closed', 'temporary_closed'),
        defaultValue: 'active',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cafes');
  },
};