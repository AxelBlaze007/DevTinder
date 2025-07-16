const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth");

app.get("/Admin/addUser", adminAuth, (req, res) => {
  res.send("User Created Successfully");
});
app.get("/Admin/removeUser", adminAuth, (req, res) => {
  res.send("user Removed successfully");
});

app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
