'use strict';
const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;
/**
 * @controller Authorize
 */
class AuthorizeController extends Controller {
  /**
   * @summary authorize
   * @description authorize
   * @router POST /api/v1/login
   * @request body authorize_login *login 
   * @response 200 baseResponse ok
   */
  async login() {
    const { username, password } = this.ctx.request.body;
    const { ctx } = this;
    const whiteList = this.app.config.userList || [];

    if (whiteList[username] != null && whiteList[username] === password) {
      try {
        const token = await new Promise((resolve, reject) => {
          jwt.sign({ username }, ctx.app.config.passportJwt.secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              reject(err);
            }
            resolve(token);
          });
        });
        ctx.status = 200;
        ctx.body = { code: 0, token };
      } catch (error) {
        ctx.state = 401;
      }
    } else {
      ctx.status = 401;
    }
  }
}

module.exports = AuthorizeController;
