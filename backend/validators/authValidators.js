const { body } = require("express-validator");

// Register validation rules
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Login validation rules
const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
