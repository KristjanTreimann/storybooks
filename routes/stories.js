// We want our top level routes to be in this file

const express = require('express') // Bring in express to use express router
const router = express.Router() // create router
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// Set up route

// @desc Show add page
// @route GET /stories/add
// @param ensureAuth - comes from middleware
router.get('/add', ensureAuth, (req, res) => {
  // we dont need 'stories/add' because '/stories' is defined in app.js
  res.render('stories/add') // render add template from stories folder
})

// Export router
module.exports = router
