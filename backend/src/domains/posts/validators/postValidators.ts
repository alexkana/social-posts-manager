import { body, param } from "express-validator";

// Create post validation rules
export const createPostValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean value"),
];

// Update post validation rules
export const updatePostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID format"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean value"),
];

// Get post by ID validation
export const getPostByIdValidation = [
  param("id").isMongoId().withMessage("Invalid post ID format"),
];
