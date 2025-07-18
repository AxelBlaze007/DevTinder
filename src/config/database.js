const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://roypannalal007:niptahai7@namastenode.fl0zbze.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
