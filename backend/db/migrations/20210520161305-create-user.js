'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      hashed_password: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      zip_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      mentor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      student: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
