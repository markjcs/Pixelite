const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// pull out a 'user' model
const User = mongoose.model('user');

// user: user model instance in mongoose model
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id -> _id in mongodb
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    // user details
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.emails[0].value);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // call the last passport function done
          done(null, existingUser);
        } else {
          // save profile.id to DB
          new User({ googleId: profile.id,
            email: profile.emails[0].value,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName })
          .save()
          .then((user) => {
            done(null, user);
          });
        }
      });
    },
  ),
);
