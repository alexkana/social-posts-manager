import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Post } from '../../types/post';
import { useAuth } from '../../contexts/AuthContext';
import { Heart } from 'lucide-react';
import { useLikes } from '../../hooks/useLikes';

interface PostCardProps {
  post: Post;
  onLikeToggle: (postId: string, isLiked: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { isPostLiked, toggleLike } = useLikes();

  console.log(post)
  
  const isLiked = user ? isPostLiked(post._id) : false;
  const userName = typeof post.user === 'object' ? user.name : 'Unknown User';
  
  const handleLikeToggle = async () => {
    try {
      if (!user) return;
      
      await toggleLike(post._id, isLiked);
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-black font-bold">{post.title}</CardTitle>
        </div>
        <div className="text-sm text-gray-500">
          Posted by {userName} • {formatDate(post.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-gray-700">{post.content}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
       
          <div 
            onClick={handleLikeToggle}
            className="gap-2"
          >
            <Heart 
              className={`h-4 w-4 text-black cursor:pointer ${isLiked ? 'fill-current' : ''}`} 
            />
          </div>
       
      </CardFooter>
    </Card>
  );
};

export default PostCard; 