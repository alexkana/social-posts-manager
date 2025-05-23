const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');
const { validate } = require('../middleware/validation');
const { 
  createPostValidation, 
  updatePostValidation, 
  getPostByIdValidation 
} = require('../validators/postValidators');

// @route   GET /api/posts/all
// @desc    Get all public posts
// @access  Public
router.get('/all', auth, postController.getAllPosts);

// @route   GET /api/posts
// @desc    Get all posts for a user
// @access  Private
router.get('/', auth, postController.getPosts);

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, createPostValidation, validate, postController.createPost);

// @route   GET /api/posts/:id
// @desc    Get a post by ID
// @access  Public
router.get('/:id', auth, getPostByIdValidation, validate, postController.getPostById);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, updatePostValidation, validate, postController.updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, getPostByIdValidation, validate, postController.deletePost);

module.exports = router; 