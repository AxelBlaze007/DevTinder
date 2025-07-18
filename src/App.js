const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signUp", async (req, res) => {
  // creating the new instance / object of user
  const userObj = {
    firstName: "Pannalal",
    lastName: "Mahto",
    age: 23,
    emailId: "pana3g@gmail.com",
  };

  const user = new User(userObj);

  try {
    await user.save();
    res.send("User saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established..");
    app.listen(3000, () => {
      console.log("Server running on PORT 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed..");
  });
