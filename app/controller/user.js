'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    try {
      const userlist = await ctx.model.User.findAll(query);
      ctx.body = {
        code: 0,
        count: userlist.length,
        data: userlist,
      };
    } catch (error) {
      throw error;
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    const { name, password, type } = ctx.request.body;
    const user = await ctx.model.User.create({ name, password, type });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, password, type } = ctx.request.body;
    await user.update({ name, password, type });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
