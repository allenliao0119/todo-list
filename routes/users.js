const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.post('/', (req, res) => {
  const user = req.body
  if (user.email === '' || user.password === '') {
    req.flash('error', 'email 及密碼為必填') 
    return res.redirect('back')
  }

  if (user.password !== user.passwordConfirm) {
    req.flash('error', '驗證密碼與密碼不符')
    return res.redirect('back')
  } 
  
  return User.findOrCreate({
    where: {email: user.email},
    defaults: {
      password: user.password
    }
  })
    .then(result => {
      const [user, existed] = result
      if (existed) {
        req.flash('success', '註冊成功')
        res.redirect('/login')
      } else {
        req.flash('error', 'email 已註冊')
        res.redirect('back')
      }
    })
    .catch(error => {
      error.error_msg = '註冊失敗'
      next(error)
    })
})

module.exports = router