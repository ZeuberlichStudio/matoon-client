import { createSlice } from '@reduxjs/toolkit';

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

export const selectPlatform = state => state.device.platform;
export const selectTarget = state => state.device.target;

export default deviceSlice.reducer;
export const { setPlatform, setTarget } = deviceSlice.actions;
