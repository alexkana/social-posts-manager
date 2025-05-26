import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/errorHandler';
import {
  CreatePostData,
  UpdatePostData,
  AuthenticatedRequest,
  CreatePostRequest,
  UpdatePostRequest,
  GetPostByIdRequest,
  IPost
} from '../types/index';
import { PostService } from '../services/postService';

// Get all posts for a user
export const getPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await PostService.getPosts(req.user.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get all public posts
export const getAllPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Create a post
export const createPost = async (req: CreatePostRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await PostService.createPost(req.user.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Get a post by ID
export const getPostById = async (req: GetPostByIdRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Update a post
export const updatePost = async (req: UpdatePostRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await PostService.updatePost(req.params.id, req.user.id, req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete a post
export const deletePost = async (req: GetPostByIdRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await PostService.deletePost(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 