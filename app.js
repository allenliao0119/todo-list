const express = require('express')
const app = express()
const {engine} = require('express-handlebars')

const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')

// ----define routes----
// initialize
app.get('/', (req, res) => {
  res.render('index')
})

// create todo
app.get('/todos/new', (req, res) => {
  res.send('create todo page.')
})

app.post('/todos', (req, res) => {
  res.send('todo has been created.')
})

// read todo
app.get('/todos', (req, res) => {
  res.send('read all todos.')
})

app.get('/todos/:id', (req, res) => {
  res.send(`read todo: ${req.params.id}.`)
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