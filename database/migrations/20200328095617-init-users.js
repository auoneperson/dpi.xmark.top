'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: STRING(50), primaryKey: true },
      created_at: BIGINT,
      updated_at: BIGINT,
      version: BIGINT,

      name: STRING(32),
      password: STRING(128),
      type: INTEGER, // 0 admin 1 staff
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};