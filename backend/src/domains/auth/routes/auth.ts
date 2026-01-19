import * as express from "express";
import type { RequestHandler } from "express";

import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/authController";
import auth from "../../../shared/middleware/auth";
import {
  registerValidation,
  loginValidation,
} from "../validators/authValidators";
import { validate } from "../../../shared/middleware/validation";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", registerValidation, validate, register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", loginValidation, validate, login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, getCurrentUser as RequestHandler);

// @route   POST /api/auth/logout
// @desc    Logout user by clearing the cookie
// @access  Public
router.post("/logout", logout);

export default router;
