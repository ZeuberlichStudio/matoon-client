import { createSlice } from '@reduxjs/toolkit';
import { isBoolean } from 'lodash';

const initialState = {
    modalElement: null,
    modalElementAnimating: false,
    overlay: false,
    headerOverlay: false,
    search: false,
    newModalAllowed: true
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setModalElement: ( state, {payload} ) => {
            state.modalElement = payload;
        },
        animateModalElement: ( state, {payload} ) => {
            state.modalElementAnimating = isBoolean(payload) ? payload : state.modalElementAnimating;
        },
        toggleOverlay: ( state, {payload} ) =>  {
            state.overlay = isBoolean(payload) ? payload : state.overlay;
        },
        toggleHeaderLayer: ( state, {payload} ) => {
            state.headerOverlay = payload;
        },
        toggleSearch: ( state, {payload} ) => {
            state.search = isBoolean(payload) ? payload : state.search;
            state.headerOverlay = payload;
        }
    }
})

export default uiSlice.reducer;
export const {
    setModalElement,
    animateModalElement,
    toggleOverlay,
    toggleSearch,
    toggleHeaderLayer,
} = uiSlice.actions;