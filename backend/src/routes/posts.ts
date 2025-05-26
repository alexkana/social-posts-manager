import * as express from 'express';
import type { RequestHandler } from 'express';
import auth from '../middleware/auth';
import { getAllPosts, getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController';
import { validate } from '../middleware/validation';
import { 
  createPostValidation, 
  updatePostValidation, 
  getPostByIdValidation 
} from '../validators/postValidators';

const router = express.Router();

// @route   GET /api/posts/all
// @desc    Get all public posts
// @access  Public
router.get('/all', auth, getAllPosts as RequestHandler);

// @route   GET /api/posts
// @desc    Get all posts for a user
// @access  Private
router.get('/', auth, getPosts as RequestHandler);

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, createPostValidation, validate, createPost as RequestHandler);

// @route   GET /api/posts/:id
// @desc    Get a post by ID
// @access  Public
router.get('/:id', auth, getPostByIdValidation, validate, getPostById as RequestHandler);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, updatePostValidation, validate, updatePost as RequestHandler);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, getPostByIdValidation, validate, deletePost as RequestHandler);

export default router; 