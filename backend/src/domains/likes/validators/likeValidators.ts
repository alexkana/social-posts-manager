import { body, param } from "express-validator";

// Like/Unlike post validation
export const likePostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID format"),
];
