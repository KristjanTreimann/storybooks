// Create basic express server
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
// Bring db conn in
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Call connectDB
connectDB()

// Initialize app
const app = express()

// Use morgan in development mode
if (process.env.NODE_ENV === 'development') {
  // add morgan middleware with dev properties
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT.yellow}`
  )
)
