'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('user', [
      {
        first_name: "Josh",
        last_name: "Will",
        username: "josh_will",
        email: "josh.w@gmail.com",
        password: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('user', null, {});
  }
};