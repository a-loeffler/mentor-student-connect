'use strict';
module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define('Connection', {
    student_id: DataTypes.INTEGER,
    mentor_id: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN
  }, {});
  Connection.associate = function(models) {
    // associations can be defined here
    Connection.belongsTo(models.User, {foreignKey: 'student_id'});
    Connection.belongsTo(models.User, {foreignKey: 'mentor_id'});

  };
  return Connection;
};
