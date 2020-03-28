'use strict';

const Sequelize = require('sequelize');
const uuid = require('node-uuid');

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  const attrs = {};
  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
  };
  attrs.created_at = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.updated_at = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
  };
  return this.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: obj => {
        const now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = uuid.v4();
          }
          obj.created_at = now;
          obj.updated_at = now;
          obj.version = 0;
        } else {
          obj.updated_at = Date.now();
          obj.version++;
        }
      },
    },
  });
}

module.exports = { defineModel };