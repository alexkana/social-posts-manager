import React from 'react';
import PostsList from '../../components/posts/PostsList';

const PostsListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PostsList 
        title="All Posts"
        emptyMessage="No posts available. Check back later for updates!"
      />
    </div>
  );
};

export default PostsListPage; 