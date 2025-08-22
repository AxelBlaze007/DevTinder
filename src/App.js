const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser()); // Express json is a middleware given by Express and it will listen to all req

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
