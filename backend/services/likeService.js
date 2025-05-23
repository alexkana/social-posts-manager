const Post = require('../models/Post');
const LikeRepository = require('../repository/likeRepository');
const PostRepository = require('../repository/postRepository');
const { AppError } = require('../utils/errorHandler');

const likeRepository = new LikeRepository();
const postRepository = new PostRepository();

const LikeService = {
  async likePost(userId, postId) {
    const post = await postRepository.findById(postId);
    
    if (!post) {
      throw new AppError('Post not found', 404);
    }

    // Check if the post has already been liked by this user
    const alreadyLiked = await likeRepository.findOne({ user: userId, post: postId });
    if (alreadyLiked) {
      throw new AppError('Post already liked', 400);
    }

    // Create a new like entry
    await likeRepository.create({
      user: userId,
      post: postId
    });

    return { success: true };
  },

  async unlikePost(userId, postId) {
    const post = await postRepository.findById(postId);
    
    if (!post) {
      throw new AppError('Post not found', 404);
    }

    // Check if the post has not been liked by this user
    const likedPost = await likeRepository.findOne({ user: userId, post: postId });
    if (!likedPost) {
      throw new AppError('Post has not yet been liked', 400);
    }

    // Remove the like
    await likeRepository.deleteOne({ user: userId, post: postId });
    
    return { success: true };
  },

  async getLikedPosts(userId) {
    const likedPosts = await likeRepository.findByUserId(userId);
    return likedPosts.map(item => item.post);
  },

  async clearAllLikedPosts(userId) {
    await likeRepository.deleteMany({ user: userId });
    return { message: 'All liked posts cleared' };
  }
};

module.exports = LikeService; 