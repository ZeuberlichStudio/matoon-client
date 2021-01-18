import { createSlice } from '@reduxjs/toolkit';
import { isInteger } from 'lodash';

const initialState = {
    items: [
        {
            _id: '5fe8b806e39f4b41c019f33d',
            qty: 100
        },
        {
            _id: '5fe3c9b3f61d8110c4e9a9ff',
            qty: 10
        }
    ],
    customer: {
        name: null,
        phone: null,
        mail: null
    },
    contactBy: {
        option: null,
        details: null
    },
    shipping: {
        option: null,
        details: null
    },
    payment: {
        method: null,
        details: null
    },
    coupon: null

};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem: ( state, { payload } ) => {
            state.items.push(payload);
        },
        removeItemByIndex: ( state, { payload } ) => { state.items.splice( payload, 1 ); },
        removeItemById: ( state, { payload } ) => {
            const indexToRemove = state.items.findIndex(item => item._id === payload);

            state.items.splice( indexToRemove, 1 );
        },
        updateItem: ( state, { payload } ) => {
            const itemToUpdate = state.items.find(item => item._id === payload._id); 

            if ( !itemToUpdate ) return state;

            if ( 
                itemToUpdate.qty !== payload.updateObj.qty || 
                itemToUpdate.price !== payload.updateObj.price 
            ) {
                Object.assign(itemToUpdate, payload.updateObj);
            }
        },
        updateCustomerInfo: (state, {payload}) => { state.customer = {...state.customer, ...payload} },
        updateContactOption: (state, {payload}) => { state.contactBy = {...state.contactBy, ...payload} },
        updateShipping: (state, {payload}) => {
            if ( 
                typeof(payload.option) !== 'undefined' &&
                typeof(payload.details) !== 'undefined' 
            ) state.shipping = payload;
        } 
    }
});

export default cartSlice.reducer;
export const {
    addItem,
    removeItemByIndex,
    removeItemById,
    updateItem,
    updateCustomerInfo,
    updateContactOption,
    updateShipping
} = cartSlice.actions;