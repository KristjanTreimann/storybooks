const path = require('path') // core node.js module. bring in to use path.join()
const express = require('express') // Create basic express server
const mongoose = require('mongoose') // Use to store session in database
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const exphbs = require('express-handlebars') // Add express handlebars
const methodOverride = require('method-override') // to make PUT and DELETE to db
const passport = require('passport') // Add passport module
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) // Pass in session
const connectDB = require('./config/db') // Bring db conn in

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
// Pass in (passport) so we can use it in passport.js file
require('./config/passport')(passport)

// Call connectDB
connectDB()

// Initialize app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
// accept JSON data
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
// Use morgan in development mode
if (process.env.NODE_ENV === 'development') {
  // add morgan middleware with dev properties
  app.use(morgan('dev'))
}

// Hadlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select
} = require('./helpers/hbs')

// Handlebars
// We're setting our view engine and can use .hbs extension
app.engine(
  '.hbs',
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: 'main',
    extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// Sessions (Express-session middleware)
app.use(
  session({
    secret: 'kristjan',
    resave: false,
    saveUninitialized: false,
    // set store to new MongoStore({takes in an object with mongooseConnection: -> to get that : mongoose.connection(gives you the current mongoose connection)})
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public'))) // __dirname - current directory, go to public folder

// Routes

app.use('/', require('./routes/index'))
// Any link with /auth is linked to auth routes
app.use('/auth', require('./routes/auth'))
// Any link with /stories is linked to stories routes
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV.underline} mode on port ${PORT.yellow}`
  )
)
