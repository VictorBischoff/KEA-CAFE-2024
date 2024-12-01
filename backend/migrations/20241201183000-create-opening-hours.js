module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OpeningHours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dayOfWeek: {
        type: Sequelize.ENUM(
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday'
        ),
        allowNull: false,
      },
      openTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      closeTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      isClosed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      cafeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cafes', // Ensure this matches the corrected table name
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OpeningHours');
  },
};