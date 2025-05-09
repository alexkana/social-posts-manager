const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

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
router.post('/', auth, postController.createPost);

// @route   GET /api/posts/:id
// @desc    Get a post by ID
// @access  Public
router.get('/:id', auth, postController.getPostById);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, postController.updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router; 