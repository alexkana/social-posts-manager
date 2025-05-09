import { Post } from './post';

// Post component props
export interface PostCardProps {
  post: Post;
  onLikeToggle: (postId: string, isLiked: boolean) => void;
}

export interface PostsListProps {
  fetchPosts?: () => Promise<Post[]>;
  title?: string;
  emptyMessage?: string;
  showClearButton?: boolean;
  onClearAll?: () => Promise<void>;
  includeUserPosts?: boolean;
}

export interface PostsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}