import { Document } from "mongoose";

import { AuthenticatedRequest } from "./auth";
import { IUser } from "./user";
import { IPost } from "./post";

// LikedPost Interface
export interface ILikedPost extends Document {
  _id: string;
  user: IUser | string;
  post: IPost | string;
  createdAt: Date;
}

// Like request types extending Express Request
export interface LikePostRequest extends AuthenticatedRequest {
  params: {
    id: string;
  };
}

// Basic CRUD operations
export interface ILikeCrud {
  create(likeData: Partial<ILikedPost>): Promise<ILikedPost>;
  findOne(query: any): Promise<ILikedPost | null>;
  delete(id: string): Promise<void>;
}

// Query operations
export interface ILikeQuery {
  findByUserId(userId: string): Promise<ILikedPost[]>;
  findByPostId(postId: string): Promise<ILikedPost[]>;
  count(filter?: any): Promise<number>;
}

// Bulk operations
export interface ILikeBulk {
  deleteOne(query: any): Promise<void>;
  deleteMany(query: any): Promise<{ deletedCount?: number }>;
  bulkCreate(likeDataArray: Partial<ILikedPost>[]): Promise<ILikedPost[]>;
}

// Business logic operations
export interface ILikeBusiness {
  isPostLiked(userId: string, postId: string): Promise<boolean>;
  getLikeCount(postId: string): Promise<number>;
  toggleLike(
    userId: string,
    postId: string,
  ): Promise<{ liked: boolean; count: number }>;
}

// Main repository interface combining all domains
export interface ILikeRepository
  extends ILikeCrud,
    ILikeQuery,
    ILikeBulk,
    ILikeBusiness {}
