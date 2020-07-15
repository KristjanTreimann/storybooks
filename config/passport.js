// Here goes login strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose') // bring in mongoose
const User = require('../models/User')

// As we passed in passport in app.js we can catch it in function
module.exports = function (passport) {
  // Create google strategy. Takes in an object {
  // clientID : from config.env
  // clientSecret : from config.env
  // callbackURL: same one as in google console
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
      }, // async await because we use mongoose
      // accessToken - get stuff available to us
      // done - callback we call when were done doing we want
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
      }
    )
  )

  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
