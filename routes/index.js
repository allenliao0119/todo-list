const express = require('express')
const router = express.Router()

const users = require('./users')
const todos = require('./todos')

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
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

  res.send('user login')
})

router.post('/logout', (req, res) => {
  res.send('user logout')
})

module.exports = router