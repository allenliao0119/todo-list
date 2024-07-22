const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

const port = 3000
const router = require('./routes')

const app = express()

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// ----define routes----
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(router)

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})