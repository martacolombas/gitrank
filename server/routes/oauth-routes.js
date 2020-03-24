const router = require('express').Router();
const passport = require('passport');

// auth with github
router.get(
  '/github',
  passport.authenticate('github', {
    /*  scope is read only is most cases, except in repo:invite since
    "Grants accept/decline abilities for invitations to collaborate on a repository."
    and it's necessary to support collaborative features such as "Assign to me"
    https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
    */
    scope: [
      'repo:status',
      'repo_deployment',
      'repo:invite',
      'read: repo_hook',
      'read:org',
      'read:user',
    ],
  })
);

/* callback route for github to redirect to
hand control to passport to use code to grab profile info */
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect(`http://localhost:3000/dashboard?id=${req.user.githubId}`);
});

router.get('/github/auth', (req, res) => {});
module.exports = router;
