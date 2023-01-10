const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ConnectedDB = require("./config/db");

mongoose.set("strictQuery", true);
const PORT = process.env.PORT;

const app = express();

app.listen();

ConnectedDB().then(
  app.listen(PORT, () => {
    console.log("connected");
  })
);
