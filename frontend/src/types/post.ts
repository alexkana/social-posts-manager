export interface User {
  _id: string;
  name?: string;
  email?: string;
}

export interface Post {
  _id: string;
  user: string | User;
  title: string;
  content: string;
  createdAt: string;
}

export interface LikedPost {
  _id: string;
  user: string | User;
  post: string | Post;
  createdAt: string;
}

export interface EnhancedPost extends Post {
  isLikedByUser?: boolean;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  image?: string;
  platform?: string;
}

export interface LikePostResponse {
  success: boolean;
  message?: string;
  post?: Post;
}

export interface GetPostsResponse {
  posts: Post[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface GetLikedPostsResponse {
  posts: LikedPost[];
  total: number;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  platform?: string;
  image?: string;
  scheduledDate?: string;
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
} 