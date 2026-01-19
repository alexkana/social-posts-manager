import PostRepository from "../repositories/postRepository";
import { AppError } from "../../../shared/utils/errorHandler";
import type { IPost, CreatePostData, UpdatePostData } from "../types/post";

// Create a singleton instance of the repository
const postRepository = new PostRepository();

/**
 * Service for managing posts
 */
export const PostService = {
  /**
   * Get posts for a specific user
   * @param userId User ID
   * @returns List of posts
   */
  getPosts: async (userId: string): Promise<IPost[]> => {
    return postRepository.findByUserId(userId);
  },

  /**
   * Get all posts with user information
   * @returns List of all posts
   */
  getAllPosts: async (): Promise<IPost[]> => {
    // Using findAll with default sorting by createdAt
    return postRepository.findAll();
  },

  /**
   * Create a new post
   * @param userId User ID
   * @param postData Post data
   * @returns Created post
   */
  createPost: async (
    userId: string,
    postData: CreatePostData,
  ): Promise<IPost> => {
    const { title, content } = postData;

    return postRepository.create({
      user: userId,
      title,
      content,
    });
  },

  /**
   * Get a post by ID
   * @param postId Post ID
   * @returns Post with user information
   */
  getPostById: async (postId: string): Promise<IPost> => {
    const post = await postRepository.findById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return post;
  },

  /**
   * Update a post
   * @param postId Post ID
   * @param userId User ID
   * @param updateData Update data
   * @returns Updated post
   */
  updatePost: async (
    postId: string,
    userId: string,
    updateData: UpdatePostData,
  ): Promise<IPost> => {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError("User not authorized", 401);
    }

    const { title, content } = updateData;

    // Prepare update data
    const updatedData = {
      ...(title && { title }),
      ...(content && { content }),
    };

    const updatedPost = await postRepository.update(postId, updatedData);
    if (!updatedPost) {
      throw new AppError("Failed to update post", 500);
    }

    return updatedPost;
  },

  /**
   * Delete a post
   * @param postId Post ID
   * @param userId User ID
   * @returns Deletion confirmation
   */
  deletePost: async (
    postId: string,
    userId: string,
  ): Promise<{ message: string }> => {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.user.toString() !== userId) {
      throw new AppError("User not authorized", 401);
    }

    await postRepository.delete(postId);
    return { message: "Post removed" };
  },
};
