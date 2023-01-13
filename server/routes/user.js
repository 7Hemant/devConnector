const express = require("express");
const { body } = require("express-validator");
const { UserCreate } = require("../Controllers/userController");
const UserRouter = express.Router();

UserRouter.post(
  "/",
  [
    body("name").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  UserCreate
);

module.exports = UserRouter;
