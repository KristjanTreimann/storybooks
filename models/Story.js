const mongoose = require('mongoose')

// In Schema(pass in an object with the fields you want for user)
// As we are getting some fields back when authenticating with google
// One of them is ID, wich is separate from the mongoDB gives you by the default
const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // trims any whitespace
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'] // enum - list of possible values
  },
  user: {
    // as we have user connected to each story, who did what
    type: mongoose.Schema.Types.ObjectId, // special type of mongoose object id
    ref: 'User' // way we connect it to User model is with 'ref'. Reference to the User model
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically puts the date and time in
  }
})

// Export as mongoose.model('modelname', schema)
module.exports = mongoose.model('Story', StorySchema)
