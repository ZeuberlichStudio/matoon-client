import { configureStore } from '@reduxjs/toolkit';
import {deviceReducer} from './device';
import uiReducer from './ui';
import productsReducer from '~/features/catalog/productsSlice';
import queryReducer from '~/features/catalog/querySlice';
import filtersReducer from '~/features/filters/filtersSlice';
import favReducer from '~/features/favourite/favSlice';
import cartReducer from '~/store/cart';
import orderFormReducer from '~/store/order-form';

import {throttle} from 'lodash';
import { saveToStorage } from '~/common/local-storage';

const store = configureStore({
    reducer: {
        device: deviceReducer,
        ui: uiReducer,
        products: productsReducer,
        query: queryReducer,
        filters: filtersReducer,
        favourite: favReducer,
        cart: cartReducer,
        orderForm: orderFormReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

store.subscribe(throttle(() => {
    saveToStorage('cart', store.getState().cart);
}, 1000));

store.subscribe(throttle(() => {
    saveToStorage('favourite', store.getState().favourite);
}, 1000));

export default store;