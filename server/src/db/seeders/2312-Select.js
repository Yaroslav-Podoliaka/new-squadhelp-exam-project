
const { Selects } = require('../../constants/db-start-info');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Selects', Selects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Selects', null, {});
  },
};
