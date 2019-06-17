const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/user.model');

module.exports = passport => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      // Email
      User.findOne({
          email: email
        })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'This email is not registered!'
            });
          }

          // Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'Password incorrect!'
              });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};