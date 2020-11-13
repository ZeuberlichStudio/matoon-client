import { createSlice } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';

const initialState = {
    overlay: false,
    HeaderOverlay: false,
    menu: false,
    search: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleOverlay: ( state, action ) =>  {
            state.overlay = isBoolean(action.payload) ? action.payload : state.overlay;
        },
        toggleHeaderOverlay: ( state, action ) => {
            state.headerOverlay = isBoolean(action.payload) ? action.payload : state.headerOverlay;
        },
        toggleMenu: ( state, action ) => {
            state.menu = isBoolean(action.payload) ? action.payload : state.menu;
        },
        toggleSearch: ( state, action ) => {
            state.search = isBoolean(action.payload) ? action.payload : state.search;
        }
    }
})

export default uiSlice.reducer;
export const {
    toggleOverlay,
    toggleHeaderOverlay,
    toggleMenu,
    toggleSearch
} = uiSlice.actions;