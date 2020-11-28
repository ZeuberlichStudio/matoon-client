import { createSlice } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';

const initialState = {
    overlay: false,
    headerOverlay: false,
    menu: false,
    search: false,
    favourite: false,
    newModalAllowed: true
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleOverlay: ( state, {payload} ) =>  {
            state.overlay = isBoolean(payload) ? payload : state.overlay;
        },
        toggleMenu: ( state, {payload} ) => {
            state.menu = isBoolean(payload) ? payload : state.menu;
            state.headerOverlay = payload;
        },
        toggleHeaderLayer: ( state, {payload} ) => {
            state.headerOverlay = payload;
        },
        toggleSearch: ( state, {payload} ) => {
            state.search = isBoolean(payload) ? payload : state.search;
            state.headerOverlay = payload;
        },
        toggleFavourite: ( state, {payload} ) => {
            state.favourite = isBoolean(payload) ? payload : state.search;
            state.headerOverlay = payload;
        },
        setModalAllowed: ( state, {payload} ) => {
            state.newModalAllowed = payload;
        }
    }
})

export default uiSlice.reducer;
export const {
    toggleOverlay,
    toggleMenu,
    toggleSearch,
    toggleFavourite,
    toggleHeaderLayer,
    setModalAllowed
} = uiSlice.actions;