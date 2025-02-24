import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  setPageSize,
  setCurrentPage,
  setSearchTerm,
  setFilter,
  setActiveTab,
  fetchCategories,
} from '../../store/slices/productSlice';
import DataTable from '../../components/DataTable/DataTable';
import SearchFilter from '../../components/Filters/SearchFilter';
import PageSizeSelect from '../../components/Filters/PageSizeSelect';
import Pagination from '../../components/Pagination/Pagination';

const Products = () => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(null);
  const {
    products,
    categories,
    total,
    loading,
    pageSize,
    currentPage,
    searchTerm,
    filter,
    activeTab,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const skip = (currentPage - 1) * pageSize;
    let category = '';

    if (activeTab === 'LAPTOPS') {
      category = 'laptops';
    } else if (activeTab === 'CATEGORY') {
      // Don't make the API call here if it's a category tab
      // The category API call is handled in handleCategoryChange
      return;
    }

    dispatch(
      fetchProducts({
        limit: pageSize,
        skip,
        filter,
        category,
      })
    );
  }, [dispatch, currentPage, pageSize, filter, activeTab]);

  useEffect(() => {
    setFilteredData(null);
  }, [products]);

  const filterConfig = {
    title: { key: 'title', label: 'Filter by title' },
    brand: { key: 'brand', label: 'Filter by brand' },
  };

  const columns = [
    { key: 'id', title: 'ID' },
    {
      key: 'thumbnail',
      title: 'Image',
      render: (value) => (
        <img
          src={value}
          alt='product'
          className='w-16 h-16 object-cover rounded'
        />
      ),
    },
    { key: 'title', title: 'Title' },
    { key: 'description', title: 'Description' },
    { key: 'price', title: 'Price', render: (value) => `$${value}` },
    { key: 'brand', title: 'Brand' },
    { key: 'category', title: 'Category' },
    { key: 'stock', title: 'Stock' },
    { key: 'rating', title: 'Rating' },
    { key: 'discountPercentage', title: 'Discount' },
  ];

  const handleFilter = (value, placeholder) => {
    if (!value.trim()) {
      setFilteredData(null);
      dispatch(setFilter({}));
      return;
    }

    // Reset other filters
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      if (!input.placeholder?.includes(placeholder)) {
        input.value = '';
      }
    });

    // Dispatch products fetch with search term
    dispatch(
      fetchProducts({
        limit: pageSize,
        skip: 0,
        searchTerm: value,
      })
    );
  };

  const handleSearch = (value) => {
    // Only update search term in state, don't trigger API call
    dispatch(setSearchTerm(value));

    if (!value.trim()) {
      setFilteredData(null);
      return;
    }

    // Filter products locally
    const filtered = products.filter((product) =>
      Object.values(product).some(
        (field) =>
          field && field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const totalPages = Math.ceil(total / pageSize);
  const displayData = filteredData || products;

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
            placeholder={filterConfig.title.label}
            onChange={(e) =>
              handleFilter(e.target.value, filterConfig.title.label)
            }
            className='input'
          />
          <span className='h-8 bg-primaryGrey w-1'></span>
          <input
            type='text'
            placeholder={filterConfig.brand.label}
            onChange={(e) =>
              handleFilter(e.target.value, filterConfig.brand.label)
            }
            className='input'
          />
        </div>
      </div>

      <div className='mb-6'>
        <div className='flex space-x-4 mb-4'>
          <button
            onClick={() => {
              setFilteredData(null);
              dispatch(setFilter({}));
              dispatch(setActiveTab('ALL'));
            }}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              activeTab === 'ALL'
                ? 'bg-primaryBlue text-primaryBlack font-bold transform -translate-y-1 shadow-md'
                : 'bg-primaryGrey text-primaryBlack hover:bg-primaryBlue/50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilteredData(null);
              dispatch(setFilter({}));
              dispatch(setActiveTab('LAPTOPS'));
            }}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              activeTab === 'LAPTOPS'
                ? 'bg-primaryBlue text-primaryBlack font-bold transform -translate-y-1 shadow-md'
                : 'bg-primaryGrey text-primaryBlack hover:bg-primaryBlue/50'
            }`}
          >
            Laptops
          </button>
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

export default Products;
