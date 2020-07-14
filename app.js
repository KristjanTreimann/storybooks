const express = require('express') // Create basic express server
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const exphbs = require('express-handlebars') // Add express handlebars
const connectDB = require('./config/db') // Bring db conn in

// Load config
dotenv.config({ path: './config/config.env' })

// Call connectDB
connectDB()

// Initialize app
const app = express()

// Logging
// Use morgan in development mode
if (process.env.NODE_ENV === 'development') {
  // add morgan middleware with dev properties
  app.use(morgan('dev'))
}

// Handlebars
// We're setting our view engine and can use .hbs extension
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Routes
app.use('/', require('./routes/index'))
app.use('/dashboard', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT.yellow}`
  )
)
