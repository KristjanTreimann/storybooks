// We want our top level routes to be in this file

const express = require('express') // Bring in express to use express router
const router = express.Router() // create router

// Set up routes

// @desc Login/Landing page
// @route GET /
// Specify which layout to use. Pass in layout: 'login' as 2nd perim
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

// Export router
module.exports = router
