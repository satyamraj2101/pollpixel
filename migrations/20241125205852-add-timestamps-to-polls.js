'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('polls', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('polls', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('polls', 'createdAt');
    await queryInterface.removeColumn('polls', 'updatedAt');
  }
};
