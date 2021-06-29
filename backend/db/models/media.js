'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    }


  }, {});
  Media.associate = function(models) {
    // associations can be defined here
  };
  return Media;
};
