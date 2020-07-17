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
        /* console.log(profile) */
        const newUser = {
          // googleId - same as in UserSchema
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        }

        try {
          // look for the user. Await because mongoose. FindOne from User model
          // where the googleId is equal to profile.id
          let user = await User.findOne({
            googleId: profile.id
          })
          // if user exists,
          // call callback done(null - is for error, pass user in)
          if (user) {
            done(null, user)
            // else - if no user, create one
          } else {
            // await, take our model User and call create() and pass in newUser object
            user = await User.create(newUser)
            // call done(null for error, user for newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
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
