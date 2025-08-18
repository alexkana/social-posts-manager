import { useQuery } from '@tanstack/react-query';
import { Post } from '../types/post';
import * as postService from '../services/postService';
import { AxiosError } from 'axios';

interface UsePostsOptions {
  initialFetch?: boolean;
  fetchFunction?: () => Promise<Post[]>;
  includeUserPosts?: boolean;
}

export function usePosts(options: UsePostsOptions = {}) {
  const { 
    initialFetch = true,
    fetchFunction,
    includeUserPosts = false
  } = options;

  const fetchPosts = async (): Promise<Post[]> => {
    try {
      // Use custom fetch function if provided
      if (fetchFunction) {
        return await fetchFunction();
      }
      
      // Get all default posts
      const defaultPosts = await postService.getAllPosts();
      
      // fetch user posts and combine them
      if (includeUserPosts) {
        try {
          // Get user-specific posts
          const userPosts = await postService.getUserPosts();
          
          // Combine both sets of posts and remove duplicates using a Map
          const combinedPostsMap = new Map<string, Post>();
          
          // Add all posts to the map using their ID as key
          [...defaultPosts, ...userPosts].forEach(post => {
            combinedPostsMap.set(post._id, post);
          });
          
          // Convert back to array and sort by creation date
          return Array.from(combinedPostsMap.values())
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } catch (err) {
          console.error('Error fetching user posts:', err);
          // Fall back to just the default posts if user posts fail
          return defaultPosts;
        }
      } else {
        // Just use the default posts
        return defaultPosts;
      }
    } catch (err) {
      const apiError = err as AxiosError<{message: string}>;
      const errorMessage = apiError.response?.data?.message || 'Failed to load posts';
      console.error('Error loading posts:', err);
      throw new Error(errorMessage);
    }
  };

  const { data: posts = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['posts', includeUserPosts],
    queryFn: fetchPosts,
    enabled: initialFetch
  });

  return {
    posts,
    loading,
    error: error ? (error as Error).message : null,
    fetchPosts: refetch,
  };
}