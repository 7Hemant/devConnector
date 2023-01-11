const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ConnectedDB = require("./config/db");
const UserRouter = require("./routes/user");
const router = mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyparser.json());

app.use("/api/user", UserRouter);
app.listen();

ConnectedDB().then(
  app.listen(PORT, () => {
    console.log("connected");
  })
);
