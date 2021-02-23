import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './query';
import deviceReducer from './device';

export default configureStore({
    reducer: {
        query: queryReducer,
        device: deviceReducer
    }
});