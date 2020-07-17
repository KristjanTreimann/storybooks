module.exports = {
  // takes in req, res, next - function you call when you're done doing whatever it is you wanna do to call next piece of middleware
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // if authenticated call next() to move on
      return next()
    } else {
      // redirect to login(homepage)
      res.redirect('/')
    }
  },
  // if logged in disable seeing login page
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      return next()
    }
  }
}
