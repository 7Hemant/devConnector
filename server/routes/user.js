const express = require("express");
const { body } = require("express-validator");
const { UserCreate, login } = require("../Controllers/userController");
const UserRouter = express.Router();

UserRouter.post(
  "/register",
  [
    body("name").not().isEmpty(),
    body("email").isEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  UserCreate
);

UserRouter.post(
  "/login",
  [body("email").isEmail(), body("password").trim().isLength({ min: 4 })],
  login
);

module.exports = UserRouter;
