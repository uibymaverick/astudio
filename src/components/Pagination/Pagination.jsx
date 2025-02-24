import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let pages = [];
    const delta = 2; // Number of pages to show on each side

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  };

  return (
    <div className='flex justify-center space-x-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded bg-primary-grey text-primary-black hover:bg-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <ArrowLongLeftIcon className='w-4 h-4' />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== '...' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-1 rounded transition-transform duration-200 ${
            page === currentPage
              ? 'bg-primary-blue text-primary-black transform -translate-y-1 shadow-md'
              : page === '...'
              ? 'bg-primary-grey text-primary-black cursor-default'
              : 'bg-primary-grey text-primary-black hover:bg-primary-blue/50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 rounded bg-primary-grey text-primary-black hover:bg-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <ArrowLongRightIcon className='w-4 h-4' />
      </button>
    </div>
  );
};

export default Pagination;
