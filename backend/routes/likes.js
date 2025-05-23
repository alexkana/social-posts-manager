const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeController = require('../controllers/likeController');
const { validate } = require('../middleware/validation');
const { 
  likePostValidation,
} = require('../validators/likeValidators');

// @route   PUT /api/likes/:id
// @desc    Like a post
// @access  Private
router.put('/:id', auth, likePostValidation, validate, likeController.likePost);

// @route   DELETE /api/likes/:id
// @desc    Unlike a post
// @access  Private
router.delete('/:id', auth, likeController.unlikePost);

// @route   GET /api/likes
// @desc    Get all liked posts for the current user
// @access  Private
router.get('/', auth, likeController.getLikedPosts);

// @route   DELETE /api/likes
// @desc    Clear all liked posts for the current user
// @access  Private
router.delete('/', auth, likeController.clearAllLikedPosts);

module.exports = router; 