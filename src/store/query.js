import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: null,
    category: null,
    sort: 'meta.createdAt,-1',
    filter: {
        color: [],
        brand: [],
        material: [],
        sex: [],
        minPrice: null,
        maxPrice: null,
        minStock: null,
    }
}

export const querySlice = createSlice({
    name: 'query',
    initialState: initialState,
    reducers: {
        applySorting(state, action) { state.sort = action.payload; }
    }
});

export const selectSorting = state => state.query.sort;

export const { applySorting } = querySlice.actions;
export default querySlice.reducer;