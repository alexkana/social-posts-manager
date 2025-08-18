import React, { useState } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../../hooks/usePosts';
import { PostsListProps } from '../../types/component-props';
import PostsPagination from '../common/PostsPagination';
import { ITEMS_PER_PAGE } from '../../constants/pagination';

const PostsList: React.FC<PostsListProps> = ({ 
  title = 'Posts',
  emptyMessage = 'No posts found.',
  showClearButton = false,
  onClearAll,
  includeUserPosts = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use the enhanced hook with existing services
  const { posts, loading, error, fetchPosts: loadPosts } = usePosts({
    initialFetch: true,
    includeUserPosts: includeUserPosts
  });

  const handleClearAll = async () => {
    if (onClearAll) {
      try {
        await onClearAll();
        loadPosts();
      } catch (err) {
        console.error('Error clearing liked posts:', err);
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {showClearButton && posts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map(post => (
              <PostCard 
                key={post._id} 
                post={post} 
              />
            ))}
          </div>
          
          <PostsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
};

export default PostsList; 