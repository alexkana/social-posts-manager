import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostsPaginationProps } from '../../types/component-props';

const PostsPagination: React.FC<PostsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={`${className} bg-white shadow-sm rounded-lg p-2`}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className="cursor-pointer hover:bg-gray-100 text-blue-600"
            />
          </PaginationItem>
        )}
        
        {Array.from({length: totalPages}, (_, i) => i + 1).map(page => {
          // Show current page, first, last, and pages around current
          if (
            page === 1 || 
            page === totalPages || 
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page)}
                  className={`cursor-pointer ${
                    page === currentPage 
                      ? 'bg-blue-600 text-blue-600 font-bold border-blue-600 border-2' 
                      : 'text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            page === currentPage - 2 ||
            page === currentPage + 2
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis className="text-gray-500" />
              </PaginationItem>
            );
          }
          return null;
        })}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)}
              className="cursor-pointer hover:bg-gray-100 text-blue-600"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostsPagination; 