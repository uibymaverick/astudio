import React from 'react';

const PageSizeSelect = ({ value, onChange }) => {
  const options = [5, 10, 20, 50];

  return (
    <div className='flex items-center gap-2'>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className='input w-16'
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className=' text-custom-black'>Entries</span>
    </div>
  );
};

export default PageSizeSelect;
