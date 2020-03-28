
'use strict';

const Service = require('egg').Service;
const axios = require('axios');
axios.defaults.withCredentials = true;

class UserService extends Service {
  async getInfo() {
    const headers = {
      Host: 'www.xmqhq.com',
      'Content-Type': 'application/json',
      // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
      Cookie: this.config.token,
    };
    return axios.get(`${this.config.qhqhost}/api/management/agencies/current.do`, {
      headers,
    });
  }
}

module.exports = UserService;
