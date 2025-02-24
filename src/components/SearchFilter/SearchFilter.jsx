import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchFilter = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className='relative flex items-center'>
      <button
        onClick={() => setShowInput(!showInput)}
        className='p-2 hover:bg-primary-grey rounded-full transition-colors'
      >
        <MagnifyingGlassIcon className='h-5 w-5 text-primary-black' />
      </button>
      {showInput && (
        <input
          type='text'
          onChange={(e) => {
            onSearch(e.target.value);
          }}
          className='input'
          placeholder='Search...'
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchFilter;
