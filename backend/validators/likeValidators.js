const { body, param } = require("express-validator");

// Like/Unlike post validation
const likePostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID format"),
];

module.exports = {
  likePostValidation,
};
