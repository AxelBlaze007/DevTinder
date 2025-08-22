const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // minLength: 25,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: "Name should not include any symbol",
      },
    },
    lastName: {
      type: String,
      // minLength: 26,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: "Name should not include any symbol",
      },
    },
    age: {
      type: Number,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: function (value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    gender: {
      type: String,
      required: true,
      validate: function (value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Validation failed");
        }
      },
    },
    displayPic: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    about: {
      type: String,
      default: "This is the default bio of User",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "JaiShreeRam", {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
