import api from './api';
import { Post, CreatePostPayload, UpdatePostPayload } from '../types/post';

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts/all');
  return response.data;
};

export const getUserPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData: CreatePostPayload): Promise<Post> => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePost = async (id: string, postData: UpdatePostPayload): Promise<Post> => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
}; 