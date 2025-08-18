import { Document } from "mongoose";
import { Request } from "express";

import { AuthenticatedRequest } from "./auth";
import { IUser } from "./user";

// Post Interface - matching original schema exactly
export interface IPost extends Document {
  _id: string;
  user: Partial<IUser> | string;
  title: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Post request body types
export interface CreatePostBody {
  title: string;
  content: string;
}

export interface UpdatePostBody {
  title?: string;
  content?: string;
}

// Post request types extending Express Request
export interface CreatePostRequest extends AuthenticatedRequest {
  body: CreatePostBody;
}

export interface UpdatePostRequest extends AuthenticatedRequest {
  body: UpdatePostBody;
  params: {
    id: string;
  };
}

export interface GetPostByIdRequest extends AuthenticatedRequest {
  params: {
    id: string;
  };
}

// Basic CRUD operations
export interface IPostCrud {
  create(postData: Partial<IPost>): Promise<IPost>;
  findById(id: string): Promise<IPost | null>;
  update(id: string, updateData: Partial<IPost>): Promise<IPost | null>;
  delete(id: string): Promise<void>;
}

// Query and retrieval operations
export interface IPostQuery {
  findAll(): Promise<IPost[]>;
  findByUserId(userId: string): Promise<IPost[]>;
  count(filter?: any): Promise<number>;
}

// Search and filter operations
export interface IPostSearch {
  search(query: string): Promise<IPost[]>;
  findByTags(tags: string[]): Promise<IPost[]>;
}

// Main repository interface combining all domains
export interface IPostRepository extends IPostCrud, IPostQuery, IPostSearch {}

// Create post data interface
export interface CreatePostData {
  title: string;
  content: string;
  isPublic?: boolean;
}

// Update post data interface
export interface UpdatePostData {
  title?: string;
  content?: string;
  isPublic?: boolean;
}
