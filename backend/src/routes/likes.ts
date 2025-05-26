import * as express from "express";
import type { RequestHandler } from "express";

import auth from "../middleware/auth";
import {
  likePostController,
  unlikePostController,
  getLikedPostsController,
  clearAllLikedPostsController,
} from "../controllers/likeController";
import { validate } from "../middleware/validation";
import { likePostValidation } from "../validators/likeValidators";

const router = express.Router();

// @route   PUT /api/likes/:id
// @desc    Like a post
// @access  Private
router.put(
  "/:id",
  auth,
  likePostValidation,
  validate,
  likePostController as RequestHandler,
);

// @route   DELETE /api/likes/:id
// @desc    Unlike a post
// @access  Private
router.delete("/:id", auth, unlikePostController as RequestHandler);

// @route   GET /api/likes
// @desc    Get all liked posts for the current user
// @access  Private
router.get("/", auth, getLikedPostsController as RequestHandler);

// @route   DELETE /api/likes
// @desc    Clear all liked posts for the current user
// @access  Private
router.delete("/", auth, clearAllLikedPostsController as RequestHandler);

export default router;
