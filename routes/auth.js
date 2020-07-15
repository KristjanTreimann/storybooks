const express = require('express') // Bring in express to use express router
const router = express.Router() // create router
const passport = require('passport')

// Set up Auth Routes

// @desc Auth with Google
// @route GET /auth/google
// passport.authenticate('strategy', define scope:['were asking profile data')]
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google Auth callback
// @route GET /auth/google/callback
// passport.authenticate('strategy', failureRedirect: 'redirects to '/' which is login]
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // If it is successful redirect to dashboard
    res.redirect('/dashboard')
  }
)

// Export router
module.exports = router
