const passport = require('passport');
const User = require('../models/user-models');
const GitHubStrategy = require('passport-github2');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      callbackURL: 'http://localhost:8080/oauth/github/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('accessToken', accessToken);
      console.log('profile', profile);
      console.log('done', done);
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);
