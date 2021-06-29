'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 800],
      }
    },
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
