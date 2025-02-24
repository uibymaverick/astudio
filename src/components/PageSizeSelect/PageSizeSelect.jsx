import React from 'react';

const PageSizeSelect = ({ value, onChange }) => {
  const options = [5, 10, 20, 50];

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className='px-3 py-2 border border-primary-grey rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue'
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option} per page
        </option>
      ))}
    </select>
  );
};

export default PageSizeSelect;
