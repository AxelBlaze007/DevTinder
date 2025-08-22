const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const { firstName } = req.user;
    console.log(firstName);

    res.send(firstName + " Connection request sent!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = requestRouter;
