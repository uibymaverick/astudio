import React, { useState } from 'react';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {value || placeholder}
        <span className='absolute right-4 top-3'>▼</span>
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg'>
          {options.map((option, index) => (
            <div
              key={index}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
