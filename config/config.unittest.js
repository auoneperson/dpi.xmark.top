/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583217107559_1953';

  // add your middleware config here
  config.middleware = [];
  config.proxy = true;
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.security = {
    csrf: {
      headerName: 'x-csrf-token',
    },
  };
  // add your user config here
  const userConfig = {
    userList: {
      kelvin: '20200314',
      tony: 'pm1740',
      mark: 'yesplus369',
    },
    autoSync: true,
    bufferStock: 10,
    notifyEmail: ['mark.jin@yjiayun.com', 'tony.jiang@yjiayun.com'],
    scfg: {
      specificationName: '规格',
      specificationId: null,
      productClazzes: '1',
    },

    orderqhq: {

    },
    disableAllSchedule: false,
    qhqhost: 'http://www.xmqhq.com',
    ypchost: 'http://192.168.2.203:8096',
    ypc: {
      adminName: 'Mark测试',
      adminId: 'e65492fa-a3e7-4b8e-9779-0b2b910af871',
      token: 'jwt-s=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbkRhdGUiOiIxNTg0MDg4NTkyNTc3IiwiaWQiOiI0ODcyMzIyNC1jMmU0LTQzZTYtODE0MS05MTQwYzIyZWU5NGYiLCJ1c2VyVHlwZSI6InN1cHBsaWVyX2FkbWluIiwiZXhwIjoxNjQ2OTA5MzA5LCJ1c2VybmFtZSI6Im1hcmsifQ.WdBZiFBLgl2oFdZc2pCHkoQVU4nHGJUyC7goUVJeqbc',
      productCategoryId: '63643722-3069-4b97-ab50-9e61b3af0a6c',


    },
    qhq: {
      loginName: '13505078345',
      password: 'LIN811222',
    },
  };

  config.mysql = {
    clients: {
      xdcdb: {
        // host
        host: '192.168.2.203',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 's2DWEjxo',
        // 数据库名
        database: 'xmqhq-dc',

      },
      ypcdb: {
        // host
        host: 'sh-cdb-86nx0avi.sql.tencentcdb.com',
        // 端口号
        port: '62423',
        // 用户名
        user: 'yjia_reader',
        // 密码
        password: 'incker20190114',
        // 数据库名
        database: 'ypc',
      },
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.fullEmail = {
    service: '126',
    port: '465',
    ssl: true,
    user: 'auoneperson@126.com',
    password: '5tgbhu8',
    from: 'auoneperson@126.com',
    debug: true,
  };
  return {
    ...config,
    ...userConfig,
  };
};
