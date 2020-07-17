const mongoose = require('mongoose')

// In Schema(pass in an object with the fields you want for user)
// As we are getting some fields back when authenticating with google
// One of them is ID, wich is separate from the mongoDB gives you by the default
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    // Google gives first and last name back
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically puts the date and time in
  }
})

// Export as mongoose.model('modelname', schema)
module.exports = mongoose.model('User', UserSchema)
