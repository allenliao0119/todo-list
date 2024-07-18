const express = require('express')
const app = express()
const {engine} = require('express-handlebars')

const port = 3000

const db = require('./models')
const { raw } = require('mysql2')
const Todo = db.Todo

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// ----define routes----
app.use(express.urlencoded({extended: true}))

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
  res.send(`todo: ${req.params.id} edit page.`)
})

app.put('/todos/:id', (req, res) => {
  res.send(`todo: ${req.params.id} has been modified.`)
})

// delete todo
app.delete('/todos/:id', (req, res) => {
  res.send(`todo: ${req.params.id} has been deleted.`)
})

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})