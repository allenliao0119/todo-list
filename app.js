const express = require('express')
const app = express()

const flash = require('connect-flash')
const session = require('express-session')

const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const router = require('./routes')
const passport = require('passport')

const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// ----define routes----
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
// app.use(passport.session())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})