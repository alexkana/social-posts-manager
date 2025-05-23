const likeService = require('../services/likeService');

// Like a post
exports.likePost = async (req, res, next) => {
  try {
    const result = await likeService.likePost(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Unlike a post
exports.unlikePost = async (req, res, next) => {
  try {
    const result = await likeService.unlikePost(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Get all liked posts for the current user
exports.getLikedPosts = async (req, res, next) => {
  try {
    const posts = await likeService.getLikedPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Clear all liked posts for the current user
exports.clearAllLikedPosts = async (req, res, next) => {
  try {
    const result = await likeService.clearAllLikedPosts(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 