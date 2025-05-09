const Post = require('../models/Post');
const LikedPosts = require('../models/LikedPosts');

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has already been liked by this user using LikedPosts model
    const alreadyLiked = await LikedPosts.hasLiked(req.user.id, req.params.id);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    // Create a new like entry
    await new LikedPosts({
      user: req.user.id,
      post: req.params.id
    }).save();
    
    
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Handle duplicate key error (if user tries to like same post again)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Post already liked' });
    }
    res.status(500).send('Server error');
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has not been liked by this user
    const likedPost = await LikedPosts.findOne({ user: req.user.id, post: req.params.id });
    if (!likedPost) {
      return res.status(400).json({ message: 'Post has not yet been liked' });
    }

    // Remove the like
    await LikedPosts.deleteOne({ user: req.user.id, post: req.params.id });
    
    
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

// Get all liked posts for the current user
exports.getLikedPosts = async (req, res) => {
  try {
    // Use the new model's static method to find posts liked by user
    const likedPosts = await LikedPosts.findLikedByUser(req.user.id);
    
    // Map to return just the post objects
    const posts = likedPosts.map(item => item.post);
    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Clear all liked posts for the current user
exports.clearAllLikedPosts = async (req, res) => {
  try {
    // Find all posts that have been liked by the current user
    const likedPosts = await LikedPosts.find({ user: req.user.id });
    
    // Delete all likes
    await LikedPosts.deleteMany({ user: req.user.id });
    
    // Wait for all updates to complete
    
    res.json({ message: 'All liked posts cleared' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 