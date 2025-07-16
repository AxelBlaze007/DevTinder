const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Your server is running");
});

app.use("/test", (req, res) => {
  res.send("Your test is running");
});

app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
