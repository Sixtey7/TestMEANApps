var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');

module.exports = function(app) {
/*
  app.route('/users')
    .post(users.create)
    .get(users.list);

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  app.route('/users/username/:userName')
    .get(users.read);
*/
  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash : true
    }));
/*
    app.param('userId', users.userByID);
    app.param('userName', users.userByUsername);
*/
app.get('/signout', users.signout);
};
