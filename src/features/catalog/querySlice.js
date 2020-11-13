import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: null,
    sort: 'meta.orders,-1',
    filter: {
        color: [],
        brand: [],
        material: [],
        sex: [],
        minPrice: null,
        maxPrice: null,
        minStock: null,
    },
    category: null
}

export const querySlice = createSlice({
    name: 'query',
    initialState: initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.filter = action.payload;
        },
        sortingChanged: (state, action) => {
            state.sort = action.payload;
        },
        categoryChanged: (state, action) => {
            state.category = action.payload;
        },
        setSearch: (state, { payload }) => {
            state.search = payload;
        }
    }
});

export const { filterChanged, sortingChanged, categoryChanged, setSearch } = querySlice.actions;

export default querySlice.reducer;

//selectors

export const selectSorting = state => state.query.sort;
export const selectFilter = state => state.query.filter;
export const selectCategory = state => state.query.category;