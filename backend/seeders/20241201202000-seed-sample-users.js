const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash passwords with complex requirements
    const hashedPassword1 = await bcrypt.hash('Password1!', 10);
    const hashedPassword2 = await bcrypt.hash('SecurePwd2@', 10);
    const hashedPassword3 = await bcrypt.hash('Admin123#', 10);
    const hashedPassword4 = await bcrypt.hash('Testing4$', 10);
    const hashedPassword5 = await bcrypt.hash('GuestUser5%', 10);
    const hashedPassword6 = await bcrypt.hash('Example6&', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: hashedPassword1,
        role: 'user',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        password: hashedPassword2,
        role: 'user',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: hashedPassword3,
        role: 'admin',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test_user1',
        email: 'test1@example.com',
        password: hashedPassword4,
        role: 'user',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test_user2',
        email: 'test2@example.com',
        password: hashedPassword5,
        role: 'user',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'guest_user',
        email: 'guest@example.com',
        password: hashedPassword6,
        role: 'user',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};