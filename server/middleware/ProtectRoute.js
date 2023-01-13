const JWT = require("jsonwebtoken");
const SecretKey = process.env.jwtSecret;
const User = require("../modules/User");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, SecretKey);
      // Get user from the token
      req.User = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    //check if not token
    return res.status(401).json({
      message: "no Token,authorization denied",
    });
  }
};

module.exports = { protect };
