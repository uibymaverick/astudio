import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white rounded-lg shadow'>
        <thead className='bg-gray-100'>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
