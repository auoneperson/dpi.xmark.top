'use strict';
const { defineModel } = require('./index.js');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = defineModel.call(app.model, 'users', {
    no: STRING(32),
    name: STRING(32),
    client: STRING(32),
    clientType: INTEGER,
    address: STRING(256),
    area: STRING(32),
    estimatedDate: DATE,
    designer: STRING(32),
    master: STRING(32),
    supervision: STRING(32),
    remark: STRING(512),
  });

  return Users;
};

