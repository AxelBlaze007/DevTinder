const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error(" Name is not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid");
  }
};

const validateProfileEdit = (req) => {
  const validField = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "displayPic",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => {
    return validField.includes(field);
  });
  console.log(isEditAllowed);

  return isEditAllowed;
};

module.exports = {
  validateSignUp,
  validateProfileEdit,
};
