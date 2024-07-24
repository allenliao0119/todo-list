const express = require('express')
const router = express.Router()

const db = require('../models')
const Todo = db.Todo

// create todo
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res, next) => {
  const name = req.body.name
  return Todo.create({ name })
        .then(() => {
                req.flash('success', '新增成功!')
                res.redirect('/todos')
        })
        .catch(error => {
                error.errorMessage = '新增失敗:('
                next(error)
        })
})

// read todo
router.get('/', (req, res, next) => {
  return Todo.findAll({
        attributes: ['id', 'name', 'isCompleted'],
        raw: true
  })
        .then(todos => res.render('todos', { todos }))
        .catch(error => {
                error.errorMessage = '資料取得失敗'
                next(error)
        })
    })

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  return Todo.findByPk(id, {
        attributes: ['id', 'name', 'isCompleted'],
        raw: true
  })
        .then(todo => res.render('todo', { todo }))
        .catch(error => {
              error.errorMessage = '資料取得失敗'
              next(error)
        })
})

// update todo
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  return Todo.findByPk(id, {
        attributes: ['id', 'name', 'isCompleted'],
        raw: true
  })
        .then(todo => res.render('edit', { todo }))
        .catch(error => {
              error.errorMessage = '資料取得失敗'
              next(error)
        })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, isCompleted } = req.body
  console.log(req.body)
  return Todo.update({ name, isCompleted: isCompleted === 'completed' }, { where: { id } })
    .then(() => {
            req.flash('success', '修改成功!')
            res.redirect(`/todos/${id}`)
    })
    .catch(error => {
      error.errorMessage = '修改失敗:('
      next(error)
    })
})

// delete todo
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  return Todo.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除成功!')
      res.redirect('/todos')
    })
    .catch(error => {
      error.errorMessage = '刪除失敗:('
      next(error)
    })
})

module.exports = router