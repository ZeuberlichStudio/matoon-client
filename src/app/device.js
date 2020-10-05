import { createSlice } from '@reduxjs/toolkit';

export function listenToResize(dispatch) {
    function resizeHandler() {
        const width = window.innerWidth;
        const target = width > 1023 ? 'desktop' : ( width > 767 ? 'tablet' : 'mobile' );
        dispatch(setTarget(target));
    }

    resizeHandler();
    window.addEventListener('resize', resizeHandler);
}

const initialState = {
    platform: '',
    target: ''
}

const deviceSlice = createSlice({
    name: 'device',
    initialState: initialState,
    reducers: {
        setPlatform: (state, action) => { state.platform = action.payload },
        setTarget: (state, action) => {
            if (state.target !== action.payload) state.target = action.payload;
        }
    }
});

export const deviceReducer = deviceSlice.reducer;

export const { setPlatform, setTarget } = deviceSlice.actions;

export const selectPlatform = state => state.device.platform;
export const selectTarget = state => state.device.target;