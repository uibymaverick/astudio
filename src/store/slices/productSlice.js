import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const { data } = await axios.get(`${API_URL}/products/category-list`);
        return data;
    }
);

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 5, skip = 0, filter = {}, category = '', searchTerm = '' }) => {
        let url = `${API_URL}/products`;
        let params = { limit, skip };

        // Handle different URL patterns
        if (searchTerm) {
            url = `${API_URL}/products/search`;
            params = { ...params, q: searchTerm };
        } else if (category) {
            url = `${API_URL}/products/category/${category}`;
        }

        const { data } = await axios.get(url, { params });
        return data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        categories: [],
        total: 0,
        loading: false,
        error: null,
        pageSize: 5,
        currentPage: 1,
        searchTerm: '',
        filter: {},
        activeTab: 'ALL',
    },
    reducers: {
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.currentPage = 1;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export const { setPageSize, setCurrentPage, setSearchTerm, setFilter, setActiveTab } = productSlice.actions;
export default productSlice.reducer; 