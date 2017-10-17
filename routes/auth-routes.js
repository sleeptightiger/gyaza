// app/routes.js
module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.render('login');
  });

  app.get('/signup', function(req, res) {
      res.render('signup');
  });

  app.get('/portal', function (req, res) {
    res.render('../views/project-portal');
  });

  // app.get('/profile', isLoggedIn, function(req, res) {
  //     res.render('/portal', {
  //         user : req.user
  //     });
  // });

  // app.post('/signup', passport.authenticate('local-signup', {
  //     successRedirect : '/portal/',
  //     failureRedirect : '/signup'
  // }));

  app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    //console.log('userName: ' +);
    res.redirect('/portal/' + req.user.local.userName);
  });

  app.post('/', passport.authenticate('local-login', {
      successRedirect : '/portal',
      failureRedirect : '/'
  }));


  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
  };
};
