'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });
  router.post('/login', controller.auth.login);
  router.get('/test', jwt, controller.home.test);

  router.get('/', controller.home.index);

  router.resources('users', '/users', controller.users);
};
