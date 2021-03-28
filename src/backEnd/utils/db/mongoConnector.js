const mongoose = require('mongoose')

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err
    console.log('App Connected to MongoDB Atlas')
  })

module.exports = mongoose