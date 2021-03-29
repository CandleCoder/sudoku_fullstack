const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const logger = require("morgan");
require("./src/utils/db/mongoConnector");
const masterRoute = require("./src/routes/masterRoute");

// Send in Response if the App is Running in Default Route
app.get("/", (req, res) => {
  res.send("App is Running Fine");
});

app.use(express.json());

// Indicating the Versioning of the API
app.use("/v1", masterRoute);

app.use(logger('dev'));
app.use(cors());

// Console If the App is Running on Port or Not
app.listen(port, () => {
  console.log(`Sudoku Backend listening at http://localhost:${port}`);
});
