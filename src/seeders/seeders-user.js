'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //   email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // roleId: DataTypes.STRING,
    return queryInterface.bulkInsert('Users', [
      {
        email: 'example@example.com',
        password: 'password123',
        firstName: 'Nguyen',
        lastName: 'Tuan',
        address: '123 Main St',
        gender: true,
        typeRole: 'ROLE',
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
