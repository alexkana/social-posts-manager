import type { Response, NextFunction } from 'express';
import type { 
  AuthenticatedRequest,
  LikePostRequest,
  ServiceResponse,
  ILikedPost
} from '../types';
import { likePost, unlikePost, getLikedPosts, clearAllLikedPosts } from '../services/likeService';

// Like a post
export const likePostController = async (req: LikePostRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: ServiceResponse<ILikedPost> = await likePost(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Unlike a post
export const unlikePostController = async (req: LikePostRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: ServiceResponse<{ success: boolean }> = await unlikePost(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Get all liked posts for the current user
export const getLikedPostsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await getLikedPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Clear all liked posts for the current user
export const clearAllLikedPostsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: ServiceResponse<{ success: boolean; deletedCount: number }> = await clearAllLikedPosts(req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 