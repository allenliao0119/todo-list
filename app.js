const express = require('express')
const app = express()

const port = 3000

// ----define routes----
// initialize
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ----start to listen on port----
app.listen(port, (req, res) => {
  console.log(`App is running on http://localhost:${port}`)
})