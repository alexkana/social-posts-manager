const PostRepository = require('../repository/postRepository');
const { AppError } = require('../utils/errorHandler');

// Create a singleton instance of the repository
const postRepository = new PostRepository();

/**
 * Service for managing posts
 */
const PostService = {
  /**
   * Get posts for a specific user
   * @param {string} userId User ID
   * @returns {Promise<Array>} List of posts
   */
  getPosts: async (userId) => {
    return postRepository.findByUserId(userId);
  },

  /**
   * Get all posts with user information
   * @returns {Promise<Array>} List of all posts
   */
  getAllPosts: async () => {
    // Using findAll with default sorting by createdAt
    return postRepository.findAll()
  },

  /**
   * Create a new post
   * @param {string} userId User ID
   * @param {Object} postData Post data
   * @returns {Promise<Object>} Created post
   */
  createPost: async (userId, postData) => {
    const { title, content } = postData;

    return postRepository.create({
      user: userId,
      title,
      content,
    });
  },

  /**
   * Get a post by ID
   * @param {string} postId Post ID
   * @returns {Promise<Object>} Post with user information
   */
  getPostById: async (postId) => {
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    return post;
  },

  /**
   * Update a post
   * @param {string} postId Post ID
   * @param {string} userId User ID
   * @param {Object} updateData Update data
   * @returns {Promise<Object>} Updated post
   */
  updatePost: async (postId, userId, updateData) => {
    const post = await postRepository.findById(postId);
    
    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError('User not authorized', 401);
    }

    const { title, content } = updateData;

    // Prepare update data
    const updatedData = {
      ...(title && { title }),
      ...(content && { content }),   
    };

    return postRepository.update(postId, updatedData);
  },

  /**
   * Delete a post
   * @param {string} postId Post ID
   * @param {string} userId User ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  deletePost: async (postId, userId) => {
    const post = await postRepository.findById(postId);
    
    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError('User not authorized', 401);
    }

    await postRepository.delete(postId);
    return { message: 'Post removed' };
  }
};

module.exports = PostService; 