import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ limit = 5, skip = 0, filter = {} }) => {
        let url = `${API_URL}/users`;

        // If there's an active filter, use the filter endpoint
        if (filter.key && filter.value) {
            url = `${API_URL}/users/filter?key=${filter.key}&value=${filter.value}`;
        }

        const { data } = await axios.get(url, {
            params: {
                limit,
                skip,
                // Only include these params when not using filter endpoint
                ...((!filter.key || !filter.value) && filter),
            },
        });
        return data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        total: 0,
        loading: false,
        error: null,
        pageSize: 5,
        currentPage: 1,
        searchTerm: '',
        filter: {},
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.total = action.payload.total;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setPageSize, setCurrentPage, setSearchTerm, setFilter } = userSlice.actions;
export default userSlice.reducer; 