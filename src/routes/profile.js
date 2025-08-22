const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEdit } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { firstName } = req.user;
    // console.log("Logged in User id ", _id);
    console.log("Name is ", firstName);

    res.send("Reading Cookies");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("Invalid  Edit Request!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile updated successfully `);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    const isValidOldPassword = await bcrypt.compare(
      oldPassword,
      req.user.password
    );

    if (!isValidOldPassword) {
      throw new Error("please enter your correct password");
    }
    const isStrongPassword = validator.isStrongPassword(newPassword);
    if (!isStrongPassword) {
      throw new Error("Password is not strong Try again");
    }
    const loggedInUser = req.user;
    const HashPassword = await bcrypt.hash(newPassword, 10);
    Object.assign(loggedInUser, { password: HashPassword });
    await loggedInUser.save();
    res.send("password successful");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
