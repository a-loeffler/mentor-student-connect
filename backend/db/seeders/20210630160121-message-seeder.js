'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      {
        sender_id: 2,
        recipient_id: 1,
        contents: "Hey there, nice 2 meet u"
      },
      {
        sender_id: 1,
        recipient_id: 2,
        contents: "Hi"
      },
      {
        sender_id: 1,
        recipient_id: 2,
        contents: "Want to shoot hoops this weekend?"
      },
      {
        sender_id: 2,
        recipient_id: 1,
        contents: "Sure"
      },
      {
        sender_id: 2,
        recipient_id: 1,
        contents: "Where @?"
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
