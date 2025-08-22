const express = require("express");

const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUp } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signUp", async (req, res) => {
  // console.log(req.body);

  // creating the new instance / object of user
  // const userObj = {
  //   firstName: "Pannalal",
  //   lastName: "Mahto",
  //   age: 23,
  //   emailId: "pana3g@gmail.com",
  // };

  try {
    validateSignUp(req);

    const { firstName, lastName, emailId, password, gender } = req.body;

    // encrypt the password

    const HashPassword = await bcrypt.hash(password, 10);
    console.log(HashPassword);

    User.init();
    const user = new User({
      firstName,
      lastName,
      gender,
      emailId,
      password: HashPassword,
    });
    await user.save();

    res.send("User data; added successfully");
  } catch (err) {
    console.log("SignUp error", err);
    res.status(400).send("Error" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    // console.log(user); This will get all user data from DataBase

    if (!user) {
      throw new Error("Invalid Credetials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});
module.exports = authRouter;
