import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '~/common/local-storage';

const initialState = loadFromStorage('favourite') || [];

const favSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addItem: ( state, {payload} ) => {
            const newState = state.concat(payload);
            return newState;
        },
        removeItem: ( state, {payload} ) => {
            const removeIndex = state.findIndex( item => item === payload );
            state.splice( removeIndex, 1 );
            return state;
        }
    }
});

export default favSlice.reducer;
export const {
    addItem,
    removeItem
} = favSlice.actions;