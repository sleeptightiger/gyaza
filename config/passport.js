const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user').User;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passToCallback: true
  },
  function(username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.userName' : username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          console.log("existing user: ", user);
          return done(null, false);
        }
        if (!user) {
          var newUser = new User();
          newUser.local.userName = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              console.log('Error saving user to DB.', err);
            }
            console.log(newUser);
            return done(null, newUser);
          });
        }
      });
    });
  }));

passport.use('local-login', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(password);
    process.nextTick(function() {
      User.findOne({ 'local.userName' : username}, function(err, user) {
        if (err) {
          // console.log(err.stack);
          return done(err);
        }
        if (!user) {
          console.log("Incorrect username");
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
        }
        if (!user.validPassword(password)) {
          console.log("Incorrect password", password);
          return done(null, false); // create the loginMessage and save it to session as flashdata
        }
        // all is well, return successful user
        console.log(user);
        return done(null, user);
      });
    });
  }));
};



