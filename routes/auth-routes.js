// app/routes.js
module.exports = function(app, passport) {

  app.get('/', function(req, res) {
      res.render('login');
  });

  app.get('/signup', function(req, res) {
      res.render('signup');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
      res.render('project-portal', {
          user : req.user // get the user out of session and pass to template
      });
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/portal', // redirect to the secure profile section
      failureRedirect : '/signup' // redirect back to the signup page if there is an error
  }));

  app.post('/', passport.authenticate('local-login', {
      successRedirect : '/portal', // redirect to the secure profile section
      failureRedirect : '/' // redirect back to the signup page if there is an error
  }));

  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())  // <-- typo here
          return next();
      res.redirect('/');
  };
};



