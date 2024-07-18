const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const methodOverride =require('method-override')

const port = 3000

const db = require('./models')
const { raw } = require('mysql2')
const Todo = db.Todo

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// ----define routes----
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// initialize
app.get('/', (req, res) => {
  res.render('index')
})

// create todo
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name =req.body.name
  return Todo.create({name})
    .then(() => res.redirect('/todos'))
})

// read todo
app.get('/todos', (req, res) => {
  return Todo.findAll({
    attributes: ['id', 'name'],
    raw: true
  })
    .then(todos => res.render('todos', {todos}))
    .catch(error => res.status(422).json(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id, {
    attributes: ['id', 'name'],
    raw: true
  })
    .then(todo => res.render('todo', {todo}))
})
  
// update todo
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id, {
    attributes: ['id', 'name'],
    raw: true
  })
    .then(todo => res.render('edit', {todo}))
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.update({name}, {where: {id}})
    .then(() => res.redirect(`/todos/${id}`))
})

// delete todo
app.delete('/todos/:id', (req, res) => {
  res.send(`todo: ${req.params.id} has been deleted.`)
})

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})