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
          console.log("god help you");
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
};
