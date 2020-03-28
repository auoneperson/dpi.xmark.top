'use strict';
const axios = require('axios');
const LocalStrategy = require('passport-local').Strategy;

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    this.app.coreLogger.info(`DC Config Loading [${this.app.config.env}]`);
    console.warn(`dc config Loading [${this.app.config.env}]`);
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    this.app.passport.use(new LocalStrategy({
      passReqToCallback: true,
    }, (req, username, password, done) => {
      // format user
      const user = {
        provider: 'local',
        username,
        password,
      };
      console.info('%s %s get user: %j', req.method, req.url, user);
      this.app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    this.app.passport.verify(async (ctx, user) => {
      console.log(user.payload);
      console.log(user.provider);
      ctx.payload = user.payload;
      return user.payload;
    });
    this.app.passport.serializeUser(async (ctx, user) => {
      return { username: user.username };
    });
    this.app.passport.deserializeUser(async (ctx, user) => {
      return user;
    });

    this.app.axios = axios;
  }

  async didReady() {
    // 应用已经启动完毕
    // const ctx = await this.app.createAnonymousContext();
    axios.interceptors.request.use(async config => {
      return config;
    }, error => {
      this.app.logger.error.warn(error);
      // 对请求错误做些什么
      return Promise.reject(error);
    });
    axios.interceptors.response.use(
      response => {
        // this.app.logger.error.info(response);
        // 对响应数据做点什么
        return response;
      }, async error => {
        this.app.logger.error(error.message);
      });
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    // this.app.server.on('timeout', socket => {
    //   // handle socket timeout
    // });
  }
}

module.exports = AppBootHook;
