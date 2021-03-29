const mongoose = require("mongoose");

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) throw err;
    console.log("App Connected to MongoDB Atlas");
  }
);

mongoose.set('returnOriginal', false);

module.exports = mongoose;
