// We want our top level routes to be in this file

const express = require('express') // Bring in express to use express router
const router = express.Router() // create router
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Set up routes

// @desc Login/Landing page
// @route GET /
// Specify which layout to use. Pass in layout: 'login' as 2nd perim
// @param ensureGuest - comes from middleware
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

// Export router
module.exports = router
