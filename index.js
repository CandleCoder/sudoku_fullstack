const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
require('./src/backEnd/utils/db/')

// Send in Response if the App is Running in Default Route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Console If the App is Running on Port or Not
app.listen(port, () => {
  console.log(`Sudoku Backend listening at http://localhost:${port}`)
})