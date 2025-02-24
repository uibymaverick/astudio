import React from 'react';

const DataTable = ({ columns = [], data = [], loading }) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue'></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center h-64 text-primaryBlack'>
        No data available
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white'>
        <thead className='bg-primaryBlue'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='px-6 py-3 text-left text-xs font-bold text-primaryBlack uppercase tracking-wider'
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-primaryGrey'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className='px-6 py-4 whitespace-nowrap text-sm text-primaryBlack'
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
