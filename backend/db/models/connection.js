'use strict';
module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define('Connection', {
    student_id: DataTypes.INTEGER,
    mentor_id: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN
  }, {});
  Connection.associate = function(models) {
    // associations can be defined here
  };
  return Connection;
};
