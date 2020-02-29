const express = require('express');
const app = express();
const { id, key, port } = require('./config');
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}! 🚀`));

passport.use(new GitHubStrategy({
  clientID: id,
  clientSecret: key,
  callbackURL: 'http://localhost:3000/dashboard'
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })