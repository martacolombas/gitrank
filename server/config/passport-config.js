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
      console.log(accessToken);
      User.findOne({ githubId: profile.id }).then((errors, currentUser) => {
        if (currentUser) {
          currentUser
            .overwrite({ token: accessToken })
            .save()
            .then((errors, currentUser) => {
              done(null, currentUser);
            });
        } else {
          new User({
            username: profile.username,
            githubId: profile.id,
            avatarUrl: profile.photos[0].value,
            token: accessToken,
          })
            .save()
            .then(newUSer => {
              done(null, newUSer);
            });
        }
      });
    }
  )
);
