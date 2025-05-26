import Post from '../models/Post';
import LikeRepository from '../repository/likeRepository';
import PostRepository from '../repository/postRepository';
import { AppError } from '../utils/errorHandler';
import { ServiceResponse } from '../types/common';
import { IPost } from '../types/post';

const likeRepository = new LikeRepository();
const postRepository = new PostRepository();

export const likePost = async (userId: string, postId: string): Promise<ServiceResponse> => {
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
};

export const unlikePost = async (userId: string, postId: string): Promise<ServiceResponse> => {
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
};

export const getLikedPosts = async (userId: string): Promise<IPost[]> => {
  const likedPosts = await likeRepository.findByUserId(userId);
  const posts = likedPosts.map((item: any) => item.post);
  return posts;
};

export const clearAllLikedPosts = async (userId: string): Promise<ServiceResponse<{ success: boolean; deletedCount: number }>> => {
  const result = await likeRepository.deleteMany({ user: userId });
  return { 
    success: true, 
    data: { 
      success: true, 
      deletedCount: result.deletedCount || 0 
    } 
  };
}; 