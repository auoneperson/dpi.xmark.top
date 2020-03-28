'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      await ctx.render('home');
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.redirect('/login');
    }
  }
  async test() {
    this.ctx.status = 200;
    this.ctx.body = 'hi';
  }
}
module.exports = HomeController;
