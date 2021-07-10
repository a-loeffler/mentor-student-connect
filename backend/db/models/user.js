'use strict';

const { Validator } = require("sequelize");
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('cannot be an email,')
          }
        },
      },

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashed_password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 30]
      }
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    student: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashed_password', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashed_password'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  User.prototype.toSafeObject = function() {
    const { id, username, email, zip_code, first_name, last_name, mentor, student } = this;
    return { id, username, email, zip_code, first_name, last_name, mentor, student };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, first_name, last_name, email, password, zip_code, mentor, student }) {
    const hashed_password = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      hashed_password,
      zip_code,
      mentor,
      student
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Media, { foreignKey: "user_id" });
    User.hasMany(models.Connection, {foreignKey: 'student_id'});
    User.hasMany(models.Connection, {foreignKey: 'mentor_id'});
    User.hasMany(models.Message, {foreignKey: 'sender_id'});
    User.hasMany(models.Message, {foreignKey: 'recipient_id'});
  };
  return User;
};
