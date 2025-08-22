const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    // validate token
    decodedObj = await jwt.verify(token, "JaiShreeRam");

    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (Error) {
    res.status(400).send("Error :" + Error);
  }
};

module.exports = {
  userAuth,
};
