'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Media', [
      {
        mediaUrl: "https://i.ibb.co/zmLKbTv/mock-student.jpg",
        user_id: 2,
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Media', null, {});
  }
};
