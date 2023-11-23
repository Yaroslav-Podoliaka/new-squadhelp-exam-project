
const { Banks } = require('../../constants/db-start-info');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Banks', Banks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Banks', null, {});
  },
};
