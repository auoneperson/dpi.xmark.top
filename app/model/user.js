'use strict';
const { defineModel } = require('./index.js');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = defineModel.call(app.model, 'users', {
    name: STRING(32),
    password: STRING(128),
    type: INTEGER, // 0 admin 1 staff
  });

  return Users;
};
