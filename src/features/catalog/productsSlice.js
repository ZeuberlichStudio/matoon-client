import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    rows: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', (query = '') => {
    return fetch(`http://localhost:3001/products${query}`)
        .then(data => data.json())
        .catch(err => {throw Error(err)});
});

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.rows = action.payload;
        },
        [fetchProducts.pending]: state => { state.status = 'loading' },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export default productsSlice.reducer;

//Selectors

export const selectProducts = state => state.products.rows;
export const selectProductsStatus = state => state.products.status;