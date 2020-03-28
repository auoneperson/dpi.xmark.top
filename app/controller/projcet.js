'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ProjectController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    try {
      const list = await ctx.model.Projects.findAll(query);
      ctx.body = {
        code: 0,
        count: list.length,
        data: list,
      };
    } catch (error) {
      throw error;
    }
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Projects.findByPk(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    const { no, name, client, clientType, address, area, estimatedDate, designer, master, supervision, remark,
    } = ctx.request.body;
    const user = await ctx.model.Projects.create({
      no, name, client, clientType, address, area, estimatedDate, designer, master, supervision, remark,
    });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.Projects.findByPk(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { no, name, client, clientType, address, area, estimatedDate, designer, master, supervision, remark } = ctx.request.body;
    await user.update({
      no,
      name,
      client,
      clientType,
      address,
      area,
      estimatedDate,
      designer,
      master,
      supervision,
      remark,
    });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.Projects.findByPk(ctx.params.id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = ProjectController;
