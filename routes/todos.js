const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo

// create todo
router.get('/new', (req, res) => {
  try {
    res.render('new', { error: req.flash('error') })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '伺服器錯誤')
    res.redirect('back')
  }
})

router.post('/', (req, res) => {
  try {
    const name = req.body.name
    return Todo.create({ name })
      .then(() => {
        req.flash('success', '新增成功!')
        res.redirect('/todos')
      })
      .catch(error => {
        console.log(error)
        req.flash('error', '新增失敗:(')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '新增失敗:(')
    res.redirect('back')
  }

})

// read todo
router.get('/', (req, res) => {
  try {
    return Todo.findAll({
      attributes: ['id', 'name', 'isCompleted'],
      raw: true
    })
      .then(todos => res.render('todos', { todos, message: req.flash('success'), error: req.flash('error') }))
      .catch(error => {
        console.log(error)
        req.flash('error', '資料取得失敗')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '伺服器錯誤')
    res.redirect('back')
  }

})

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id
    return Todo.findByPk(id, {
      attributes: ['id', 'name', 'isCompleted'],
      raw: true
    })
      .then(todo => res.render('todo', { todo, message: req.flash('success'), error: req.flash('error') }))
      .catch(error => {
        console.log(error)
        req.flash('error', '資料取得失敗')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '伺服器錯誤')
    res.redirect('back')
  }

})

// update todo
router.get('/:id/edit', (req, res) => {
  try {
    const id = req.params.id
    return Todo.findByPk(id, {
      attributes: ['id', 'name', 'isCompleted'],
      raw: true
    })
      .then(todo => res.render('edit', { todo, error: req.flash('error') }))
      .catch(error => {
        console.log(error)
        req.flash('error', '資料取得失敗')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '伺服器錯誤')
    res.redirect('back')
  }

})

router.put('/:id', (req, res) => {
  try {
    const id = req.params.id
    const { name, isCompleted } = req.body
    console.log(req.body)
    return Todo.update({ name, isCompleted: isCompleted === 'completed' }, { where: { id } })
      .then(() => {
        req.flash('success', '修改成功!')
        res.redirect(`/todos/${id}`)
      })
      .catch(error => {
        console.log(error)
        req.flash('error', '修改失敗:(')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '修改失敗:(')
    res.redirect('back')
  }

})

// delete todo
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id
    return Todo.destroy({ where: { id } })
      .then(() => {
        req.flash('success', '刪除成功!')
        res.redirect('/todos')
      })
      .catch(error => {
        console.log(error)
        req.flash('error', '刪除失敗:(')
        res.redirect('back')
      })
  }
  catch (error) {
    console.log(error)
    req.flash('error', '刪除失敗:(')
    res.redirect('back')
  }

})

module.exports = router