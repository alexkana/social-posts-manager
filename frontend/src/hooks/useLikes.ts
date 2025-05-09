import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unlikePost, getLikedPosts, clearAllLikedPosts } from '../services/likeService';
import { Post } from '../types/post';
import { AxiosError } from 'axios';

export function useLikes() {
  const queryClient = useQueryClient();

  // Fetch all liked posts query
  const { 
    data: likedPosts = [], 
    isLoading: loading, 
    error, 
    refetch: fetchLikedPosts 
  } = useQuery({
    queryKey: ['likedPosts'],
    queryFn: async () => {
      try {
        return await getLikedPosts();
      } catch (err) {
        const apiError = err as AxiosError<{message: string}>;
        const errorMessage = apiError.response?.data?.message || 'Failed to fetch liked posts';
        console.error('Error fetching liked posts:', err);
        throw new Error(errorMessage);
      }
    }
  });
  
  // Toggle like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async ({ postId, isCurrentlyLiked }: { postId: string, isCurrentlyLiked: boolean }) => {
      if (isCurrentlyLiked) {
        await unlikePost(postId);
        return { postId, action: 'unlike' };
      } else {
        await likePost(postId);
        return { postId, action: 'like' };
      }
    },
    onSuccess: (result) => {
      // For unlike: we can optimistically update liked posts
      if (result.action === 'unlike') {
        queryClient.setQueryData(['likedPosts'], (oldData: Post[] = []) => 
          oldData.filter(post => post._id !== result.postId)
        );
      } else {
        // For like: refresh liked posts to get the updated list
        queryClient.invalidateQueries({ 
          queryKey: ['likedPosts'],
          exact: true 
        });
      }
    }
  });

  // Check if a post is liked
  const isPostLiked = (postId: string) => {
    // Alternative check using likedPosts array
    return likedPosts.some(likedPost => likedPost._id === postId);
  };

  // Clear all liked posts mutation
  const clearLikesMutation = useMutation({
    mutationFn: async () => {
      await clearAllLikedPosts();
    },
    onSuccess: () => {
      // Reset the cache for likedPosts
      queryClient.setQueryData(['likedPosts'], []);
    }
  });

  return {
    likedPosts,
    loading,
    error: error ? (error as Error).message : null,
    fetchLikedPosts,
    toggleLike: (postId: string, isCurrentlyLiked: boolean) => 
      toggleLikeMutation.mutateAsync({ postId, isCurrentlyLiked }),
    isPostLiked,
    clearLikes: () => clearLikesMutation.mutateAsync()
  };
} 