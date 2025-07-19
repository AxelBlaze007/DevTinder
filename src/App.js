const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); // Express json is a middleware given by Express and it will listen to all req

app.post("/signUp", async (req, res) => {
  // console.log(req.body);

  // creating the new instance / object of user
  // const userObj = {
  //   firstName: "Pannalal",
  //   lastName: "Mahto",
  //   age: 23,
  //   emailId: "pana3g@gmail.com",
  // };

  const user = new User(req.body);

  try {
    await user.save();
    res.send("User saved successfully");
  } catch (err) {
    res.status(400).send("Error saving the user");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);

    const user = await User.findOne({ emailId: userEmail });
    // if (user.length === 0) {
    //   res.status(400).send("User not exist");
    // } else {
    //   res.send(user);
    // }
    res.send(user);
  } catch (err) {
    res.send("something went wrong!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    console.log(userId);
    const deleteById = await User.findByIdAndDelete(userId);

    res.send("User Data deleted successfully");
  } catch (error) {
    res.send("Something went wrong");
  }
});

// Updating the Document
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data);

    res.send("Updated Successfully");
  } catch (error) {
    res.send("Something went wrong");
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
