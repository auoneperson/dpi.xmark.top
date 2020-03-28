'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 projects 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BIGINT, DATE } = Sequelize;
    await queryInterface.createTable('projects', {
      id: { type: STRING(50), primaryKey: true },
      created_at: BIGINT,
      updated_at: BIGINT,
      version: BIGINT,

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
  },
  // 在执行数据库降级时调用的函数，删除 projects 表
  down: async queryInterface => {
    await queryInterface.dropTable('projects');
  },
};