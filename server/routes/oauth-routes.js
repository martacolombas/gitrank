const router = require('express').Router();
const passport = require('passport');

// auth with github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['repo:status', 'repo_deployment', 'read:org', 'read: discussion'],
  })
);

// callback route for github to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect(`http://localhost:3000/dashboard?id=${req.user.githubId}`);
});

router.get('/github/auth', (req, res) => {});
module.exports = router;
