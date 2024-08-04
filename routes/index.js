const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: {email: username},
    raw: true
  })
    .then(user => {
      if (!user || user.password !== password) {
        return done(null, false, { message: 'email 或密碼錯誤' })
      }
      return done(null, user)
    })
    .catch(error => {
      error.errorMessage = '登入失敗'
      return done(error)
    })
}))

passport.serializeUser((user, done) => {
  const {id, name, email} = user
  return done(null, {id, name, email})
})

const users = require('./users')
const todos = require('./todos')
const { where } = require('sequelize')

router.use('/users', users)
router.use('/todos', todos)

router.get('/', (req, res) => {
  res.render('index')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// login
router.get('/login', (req, res) => 
  res.render('login')
)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/todos',
  failureRedirect: '/login',
  failureFlash: true
})
)

router.post('/logout', (req, res) => {
  res.send('user logout')
})

module.exports = router