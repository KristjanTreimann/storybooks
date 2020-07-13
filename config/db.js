// Bring in Mongoose
const mongoose = require('mongoose')
const colors = require('colors')

// Async function - when working with mpngoose it returns promises
const connectDB = async () => {
  try {
    // Try to connect. Pass in connection string, as 2nd arg options to avoid any warnings in console
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })

    // Once we connect
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
  } catch (err) {
    console.error(err)
    // Exit with failure
    process.exit(1)
  }
}
// Export so we can run this in app.js file
module.exports = connectDB
