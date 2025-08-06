'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary hover:text-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-light-bg dark:disabled:hover:bg-dark-bg-secondary transition-all duration-200"
      >
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </button>
      
      {/* First page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg hover:bg-cosmic-50 dark:hover:bg-cosmic-900/20 hover:text-cosmic-500 transition-all duration-200"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="text-light-text-muted dark:text-dark-text-muted">...</span>
          )}
        </>
      )}
      
      {/* Visible pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            currentPage === page
              ? 'text-white bg-cosmic-600 border border-cosmic-600 shadow-lg shadow-cosmic-500/25'
              : 'text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border hover:bg-cosmic-50 dark:hover:bg-cosmic-900/20 hover:text-cosmic-500'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-light-text-muted dark:text-dark-text-muted">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg hover:bg-cosmic-50 dark:hover:bg-cosmic-900/20 hover:text-cosmic-500 transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary hover:text-cosmic-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-light-bg dark:disabled:hover:bg-dark-bg-secondary transition-all duration-200"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
}
