import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: null,
    catSlug: null,
    sort: 'meta.createdAt,-1',
    filter: {
        color: [],
        brand: [],
        material: [],
        for: [],
        minPrice: null,
        maxPrice: null,
        minStock: null,
    }
}

export const querySlice = createSlice({
    name: 'query',
    initialState: initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.catSlug = action.payload;
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        },
        filterChanged: (state, action) => {
            state.filter = action.payload;
        },
        sortingChanged: (state, action) => {
            state.sort = action.payload;
        },
        categoryChanged: (state, action) => {
            state.category = action.payload;
        },
        resetQuery: () => initialState
    }
});

export const { filterChanged, sortingChanged, changeCategory, changeSearch, resetQuery } = querySlice.actions;

export default querySlice.reducer;

//selectors

export const selectSorting = state => state.query.sort;
export const selectFilter = state => state.query.filter;