import React from 'react';
import { CreatePostForm } from '@/components/posts/CreatePostForm';

const CreatePostPage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage; 