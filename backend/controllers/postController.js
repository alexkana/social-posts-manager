const PostService = require('../services/postService');

// Get all posts for a user
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get all public posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Create a post
exports.createPost = async (req, res, next) => {
  try {
    const post = await PostService.createPost(req.user.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Get a post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Update a post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await PostService.updatePost(req.params.id, req.user.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const result = await PostService.deletePost(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 