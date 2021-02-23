import { configureStore } from '@reduxjs/toolkit';
import {deviceReducer} from './device';
import uiReducer from './ui';
import productsReducer from 'features/catalog/productsSlice';
import queryReducer from 'features/catalog/querySlice';
import filtersReducer from 'features/filters/filtersSlice';
import favReducer from 'features/favourite/favSlice';
import cartReducer from 'features/cart/slice';

export default configureStore({
    reducer: {
        device: deviceReducer,
        ui: uiReducer,
        products: productsReducer,
        query: queryReducer,
        filters: filtersReducer,
        favourite: favReducer,
        cart: cartReducer
    }
});