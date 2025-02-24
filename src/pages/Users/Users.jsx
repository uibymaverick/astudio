import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  setPageSize,
  setCurrentPage,
  setSearchTerm,
  setFilter,
} from '../../store/slices/userSlice';
import DataTable from '../../components/DataTable/DataTable';
import SearchFilter from '../../components/Filters/SearchFilter';
import PageSizeSelect from '../../components/Filters/PageSizeSelect';
import Pagination from '../../components/Pagination/Pagination';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [filteredData, setFilteredData] = useState(null);
  const {
    users: userList,
    total,
    loading,
    pageSize,
    currentPage,
    searchTerm,
    filter,
  } = users;

  useEffect(() => {
    const skip = (currentPage - 1) * pageSize;
    dispatch(fetchUsers({ limit: pageSize, skip, filter }));
  }, [dispatch, currentPage, pageSize, filter]);

  // Reset filtered data when userList changes
  useEffect(() => {
    setFilteredData(null);
  }, [userList]);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'maidenName', title: 'Maiden Name' },
    { key: 'age', title: 'Age' },
    { key: 'gender', title: 'Gender' },
    { key: 'email', title: 'Email' },
    { key: 'username', title: 'Username' },
    { key: 'birthDate', title: 'Birth Date' },
    { key: 'bloodGroup', title: 'Blood Group' },
    { key: 'eyeColor', title: 'Eye Color' },
  ];

  const handleSearch = (value) => {
    dispatch(setSearchTerm(value));
    if (!value.trim()) {
      setFilteredData(null);
      return;
    }

    const filtered = userList.filter((user) =>
      Object.values(user).some(
        (field) =>
          field && field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const filterConfig = {
    firstName: { key: 'firstName', label: 'Filter by name' },
    email: { key: 'email', label: 'Filter by email' },
    birthDate: { key: 'birthDate', label: 'Filter by birth date' },
    gender: { key: 'gender', label: 'Filter by gender' },
  };

  const handleFilter = (field, value) => {
    setFilteredData(null);
    if (!value.trim()) {
      dispatch(setFilter({}));
    } else {
      // Format the filter for the API
      dispatch(
        setFilter({
          key: filterConfig[field].key,
          value: value,
        })
      );

      // Reset input values of other filters
      const inputs = document.querySelectorAll(
        'input[type="text"], input[type="date"], select'
      );
      inputs.forEach((input) => {
        if (
          input.placeholder?.includes(filterConfig[field].label) ||
          (input.tagName === 'SELECT' && field === 'gender')
        ) {
          return; // Skip the current filter
        }
        if (input.tagName === 'SELECT') {
          input.value = '';
        } else {
          input.value = '';
        }
      });
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const displayData = filteredData || userList;

  return (
    <div className='p-6 font-neutra'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-2'>
          <PageSizeSelect
            value={pageSize}
            onChange={(value) => {
              setFilteredData(null);
              dispatch(setPageSize(value));
            }}
          />
          <span className='h-8 bg-primaryGrey w-1'></span>
          <SearchFilter onSearch={handleSearch} />
          <span className='h-8 bg-primaryGrey w-1'></span>

          <input
            type='text'
            placeholder={filterConfig.firstName.label}
            onChange={(e) => handleFilter('firstName', e.target.value)}
            className='input'
          />
          <span className='h-8 bg-primaryGrey w-1'></span>
          <input
            type='text'
            placeholder={filterConfig.email.label}
            onChange={(e) => handleFilter('email', e.target.value)}
            className='input'
          />
          <span className='h-8 bg-primaryGrey w-1'></span>
          <input
            type='date'
            placeholder={filterConfig.birthDate.label}
            onChange={(e) => handleFilter('birthDate', e.target.value)}
            className='input'
          />
          <span className='h-8 bg-primaryGrey w-1'></span>
          <select
            onChange={(e) => handleFilter('gender', e.target.value)}
            className='input'
            defaultValue=''
          >
            <option value=''>All Genders</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={displayData} loading={loading} />

      <div className='mt-6'>
        {!filteredData && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
