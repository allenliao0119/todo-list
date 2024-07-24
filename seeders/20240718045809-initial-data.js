'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await (queryInterface.bulkInsert('Todos', 
      Array.from({length:100}).map((_, i) => {
        return {
          name: `todo-${i}`
        }
      })
    ))
  },

  async down (queryInterface, Sequelize) {
    await (queryInterface.bulkDelete('Todos', null))
  }
};
