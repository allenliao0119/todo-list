const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

const port = 3000

const app = express()

const db = require('./models')
const Todo = db.Todo

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

// initialize
app.get('/', (req, res) => {
  res.render('index')
})

// create todo
app.get('/todos/new', (req, res) => {
  try {
    res.render('new', { error: req.flash('error') })
  }
  catch (error) {
        console.log(error)
        req.flash('error', '伺服器錯誤')
        res.redirect('back')
  }
})

app.post('/todos', (req, res) => {
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
app.get('/todos', (req, res) => {
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

app.get('/todos/:id', (req, res) => {
  try {
    const id = req.params.id
    return Todo.findByPk(id, {
      attributes: ['id', 'name', 'isCompleted'],
      raw: true
    })
      .then(todo => res.render('todo', { todo, message: req.flash('success'), message: req.flash('error') }))
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
app.get('/todos/:id/edit', (req, res) => {
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

app.put('/todos/:id', (req, res) => {
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
app.delete('/todos/:id', (req, res) => {
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

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})