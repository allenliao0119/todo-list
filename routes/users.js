const express = require('express')
const router = express.Router()

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  res.send('create user.')
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