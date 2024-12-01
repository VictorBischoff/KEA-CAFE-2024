module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('CafeAmenities', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        details: Sequelize.STRING,
        CafeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Cafes',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        AmenityId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Amenities',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('CafeAmenities');
    },
  };