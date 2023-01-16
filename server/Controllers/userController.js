const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const SecretKey = process.env.jwtSecret;

exports.UserCreate = async (req, res) => {
  const { name, email, password } = req.body;
  const error = validationResult(req);

  //   console.log(req.body);
  //error checking
  if (!error.isEmpty()) {
    return res.status(400).json({
      errMessage: "send detail properly naming convention",
    });
  }

  try {
    //checking user exit or not then return  message`User already exit pleases change your email address` if user is exit
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User already exit pleases change your email address",
      });
    }
    const avator = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    //securing password && encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    // saving or create user in mongodb
    const registerUser = await User.create({
      name,
      email,
      password: hashpassword,
      avator,
    });
    res.status(200).json({
      message: `register user id ${registerUser._id}`,
      token: generateToken(registerUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({
      message: "invalid cendemtails",
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user?._id,
      name: user?.name,
      token: generateToken(user._id),
    });
  }
};

const generateToken = (_id) => {
  return JWT.sign({ _id }, SecretKey, { expiresIn: "7d" });
};
