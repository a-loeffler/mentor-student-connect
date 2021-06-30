'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Connections', [
      {
        mentor_id: 1,
        student_id: 2,
        approved: true,
      },
      //Not approved yet--for testing
      {
        mentor_id: 1,
        student_id: 3,
        approved: false,
      },
      {
        mentor_id: 1,
        student_id: 4,
        approved: false,
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Connections', null, {});
  }
};
