'use strict';

const Service = require('egg').Service;

class EmailService extends Service {
  async noSpecProductNotiice(noticeMsg) {
    const subject = '清货群上架了无规格商品，注意哈。';
    let msgInfo = `<div>${this.config.keys}</div>`;
    noticeMsg.forEach(msg => {
      msgInfo += `<div>
            <div></div>
          </div>`;
    });
    const html = msgInfo;

    const email = this.app.fullEmail;
    this.config.notifyEmail.forEach(async to => {
      await email.sender(to, subject, html);
    });
  }
  async shippingNotice(noticeMsg) {
    const subject = '清货群发货了，终于发货了，终于。。。';
    const qhqOrderListUrl = 'http://www.xmqhq.com/module/qhqWeb#/order';
    let orderInfo = '';
    noticeMsg.forEach(order => {
      orderInfo +=
        `<div>
          <div>快递公司：${order.logistics_company}|运单号：${order.shipping_no}</div>
          <div> 收件人：${order.shipping_name}|手机号：${order.shipping_tel} |收件地址：${order.shipping_address} </div>
        </div>`;
    });
    const html =
      `<div>
        <p><a style="color: red" href="${qhqOrderListUrl}">神秘连接</a></p>
      </div>
      <div>${orderInfo}</div>
      <div>${this.config.keys}</div>`;

    const email = this.app.fullEmail;
    this.config.notifyEmail.forEach(async to => {
      await email.sender(to, subject, html);
    });
  }
  async checkupWarning(type) {
    const subject = `${this.config.ypc.adminName}-【服务健康报警】${type}分钟未执行更新操作`;
    const html = '管理员尽快登陆服务器确认信息，日志路径/root/logs/xmqhq-data-collection';
    const email = this.app.fullEmail;
    const to = this.config.notifyEmail[0];
    return await email.sender(to, subject, html);
  }
  async adminWarning(html) {
    const to = this.config.notifyEmail[0];
    const subject = `${this.config.ypc.adminName}-系统异常警告！`;
    const email = this.app.fullEmail;
    return await email.sender(to, subject, html);
  }
  async qhqProductSpecchanged(product) {
    if (this.app.cache.changedSpec == null) {
      this.app.cache.changedSpec = [];
      // this.app.cache.changedSpec.push(product.id);
    }
    if (this.app.cache.changedSpec.indexOf(product.id) < 0) {
      const subject = `${this.config.ypc.adminName}-商品[${product.name}/${product.id}]规格变化`;
      const email = this.app.fullEmail;
      const html = JSON.stringify(product);

      // const to = this.config.notifyEmail[0];
      // return await email.sender(to, subject, html);
      this.config.notifyEmail.forEach(async to => {
        await email.sender(to, subject, html);
      });

      this.app.cache.changedSpec.push(product.id);
    }
  }
  async detectNewProduct(product) {
    if (this.app.cache.newUnProduct == null) {
      this.app.cache.newUnProduct = [];
    }
    if (this.app.cache.newUnProduct.indexOf(product[0].id) < 0) {
      const subject = `${this.config.ypc.adminName}-探测到待发布商品`;
      const email = this.app.fullEmail;
      const html = JSON.stringify({ product });
      this.config.notifyEmail.forEach(async to => {
        await email.sender(to, subject, html);
      });
      this.app.cache.newUnProduct.push(...product.map(item => item.id));
    }
  }
}

module.exports = EmailService;
