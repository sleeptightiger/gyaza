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
    userNameField: 'username',
    passwordField: 'password',
    passToCallback: true
  },
  function(username, password, done) {
    console.log(username);
    console.log(password);

    process.nextTick(function() {
      User.findOne({ 'local.username' : username}, function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          //try to send a message to user saying already in db
          return done(null);
        }
        else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              console.log('Error saving user to DB.', err);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
