const express = require("express");
const dotenv = require("dotenv").config();
const ConnectedDB = require("./config/db");
const PORT = process.env.PORT;

const app = express();

app.listen();

ConnectedDB().then(
  app.listen(PORT, () => {
    console.log("connected");
  })
);
