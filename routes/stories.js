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

// @desc Process add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  // we dont need '/stories' -> already defined in app.js
  try {
    console.log(req.user.id)
    // req.body gives as data sent from form
    // console.log(req.body)
    // user can be retrieved from req.user
    // user id gets added to req.body
    req.body.user = req.user.id
    // use story model, call create on that and pass in req.body
    await Story.create(req.body)
    // redirects to dashboard
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc Show all stories
// @route GET /stories
// @param ensureAuth - comes from middleware
// We dont have to use router.get('/stories'), because in app.js where we link all our routes, we already have /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' }) // get all public stories
      .populate('user') // add user data to it
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('stories/index', { stories }) // render index template from stories folder and pass in stories object
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc Show edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.id // get it by _id and match it to req.params.id
  }).lean() // .lean() to pass this into template

  // Check if story is there
  if (!story) {
    return res.render('error/404')
  }

  // Redirect if not the story owner
  if (story.user != req.user.id) {
    // req.user.id -> logged in user
    res.redirect('/stories')
  } else {
    res.render('stories/edit', {
      story // pass in story
    })
  }
})

// @desc Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  // check if story exists
  // use let to replace the story
  let story = await Story.findById(req.params.id).lean() // pass in id from url

  if (!story) {
    return res.render('error/404')
  }

  // Redirect if not the story owner
  if (story.user != req.user.id) {
    // req.user.id -> logged in user
    res.redirect('/stories')
  } else {
    // update story -> reassign to
    story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true, //
      runValidators: true
    })

    res.redirect('/dashboard')
  }
})

// Export router
module.exports = router
