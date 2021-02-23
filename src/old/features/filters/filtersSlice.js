import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialFilters = {
    rows: {
        color: [],
        brand: [],
        material: [],
        sex: []
    },
    status: 'idle',
    error: null
};

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
    return fetch('http://localhost:3001/products/available-filters')
        .then( data => data.json() )
        .catch( err => err );
});

const filtersSLice = createSlice({
    name: 'filters',
    initialState: initialFilters,
    extraReducers: {
        [fetchFilters.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.rows = action.payload;
        },
        [fetchFilters.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export default filtersSLice.reducer;

//Selectors
export const selectAvailableFilters = state => state.filters.rows;