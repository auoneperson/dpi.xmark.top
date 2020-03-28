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

  config.security = {
    csrf: {
      headerName: 'x-csrf-token',
    },
  };
  config.assets = {
    publicPath: '/public/',
  };
  // add your user config here
  const userConfig = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 13306,
    password: '123456',
    database: 'qs.xmark',
  };
  config.mysql = {
    clients: {
      xdcdb: {
        // // host
        // host: '192.168.2.203',
        // // 端口号
        // port: '3306',
        // // 用户名
        // user: 'root',
        // // 密码
        // password: 's2DWEjxo',
        // // 数据库名
        // database: 'xmqhq-dc',

        // host: '127.0.0.1',
        // // 端口号
        // port: '13306',
        // // 用户名
        // user: 'root',
        // // 密码
        // password: '123456',
        // // 数据库名
        // database: 'xmqhq-dc',

        host: 'sh-cdb-qvfh765u.sql.tencentcdb.com',
        // 端口号
        port: '63926',
        // 用户名
        user: 'ypc_qhq_xdc',
        // 密码
        password: '5tgbhu8ik',
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

  config.onerror = {
    accepts: ctx => {
      if (ctx.get('Content-Type') === 'application/json') {
        return 'json';
      }
      return 'html';
    },
  };

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

  config.passportJwt = {
    secret: '5tgbhu8369',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
