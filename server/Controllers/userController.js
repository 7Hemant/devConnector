const { validationResult } = require("express-validator");
const gravator = require("gravator");
const User = require("../modules/User");
exports.UserPost = async (req, res) => {
  const { name, email, pass } = req.body;
  const error = validationResult(req);

  //   console.log(req.body);
  if (!error.isEmpty()) {
    return res.status(400).json({
      errMessage: "send detail properly naming convention",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User already exit pleases change your email address",
      });
    }
    const avator = gravator.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    res.json({
      message: "user post api",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }

  //check user is exits or not

  //encrypt password
};
