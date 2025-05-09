import api from './api';
import { Post } from '../types/post';

export const likePost = async (postId: string): Promise<string[]> => {
  const response = await api.put(`/likes/${postId}`);
  return response.data;
};

export const unlikePost = async (postId: string): Promise<string[]> => {
  const response = await api.delete(`/likes/${postId}`);
  return response.data;
};

export const getLikedPosts = async (): Promise<Post[]> => {
  const response = await api.get('/likes');
  return response.data;
};

export const clearAllLikedPosts = async (): Promise<void> => {
  await api.delete('/likes');
  return;
}; 