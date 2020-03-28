'use strict';

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  email: {
    enable: true,
    package: 'egg-full-email',
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
  passportJwt: {
    enable: true,
    package: 'egg-passport-jwt',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
};
