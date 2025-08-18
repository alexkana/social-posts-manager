import React, { useState } from 'react';
import PostCard from './PostCard';
import PostsPagination from '../common/PostsPagination';
import { useLikes } from '../../hooks/useLikes';
import { useAuth } from '../../contexts/AuthContext';
import { ITEMS_PER_PAGE } from '../../constants/pagination';
import { RefreshCw, Trash2 } from 'lucide-react';

const LikedPosts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const { 
    likedPosts, 
    loading, 
    error, 
    fetchLikedPosts, 
    toggleLike,
    clearLikes 
  } = useLikes();


  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    if (user) {
      await toggleLike(postId, isLiked);
    }
  };

  const handleClearAll = async () => {
    await clearLikes();
  };

  // Pagination logic
  const totalPages = Math.ceil(likedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = likedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-8">Loading liked posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liked Posts</h1>
        <div className="flex gap-2">
          {likedPosts.length > 0 && (
            <>
              <button
                onClick={() => fetchLikedPosts()}
                className="px-4 py-2 bg-blue-500 cursor-pointer font-bold text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 cursor-pointer font-bold text-white rounded hover:bg-red-600 transition flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {likedPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't liked any posts yet.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map(post => (
              <PostCard 
                key={post._id} 
                post={post} 
                onLikeToggle={handleLikeToggle} 
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

export default LikedPosts; 