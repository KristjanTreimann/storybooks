// We want our top level routes to be in this file

const express = require('express') // Bring in express to use express router
const router = express.Router() // create router
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

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
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      // find from Story model and limit to { user }
      user: req.user.id // where user id matches the same user id who is logged in
    }).lean()
    // after we fetch the stories -> render
    res.render('dashboard', {
      name: req.user.firstName, // pass in username
      stories // pass in stories. Same as 'stories: stories'
    })
  } catch (err) {
    console.error(err)
    res.render('error/500') // from the error folder
  }
})

// Export router
module.exports = router
