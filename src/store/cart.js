import { createSlice } from '@reduxjs/toolkit';
import { loadFromStorage } from '~/common/local-storage';

const initialState = loadFromStorage('cart') ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem( state, { payload } ) { state.push(payload); },
        removeItem(state, {payload}) {
            const index = state.findIndex(({_id, variantId}) => (
                _id === payload._id,
                variantId === payload.variantId
            ));

            state.splice(index, 1);
        },
        updateItem( state, { payload } ) {
            const itemToUpdate = state.find(({_id, variantId}) => (
                _id === payload._id,
                variantId === payload.variantId
            )); 

            if ( !itemToUpdate ) return state;
            else Object.assign(itemToUpdate, payload);
        },
        resetCart() {
            return [];
        }
    }
});

export function selectItems(state, _id) { return state.cart; }
export function selectItem(state, _id) { return state.cart.find(item => item._id === _id); }
export function selectTotal(state) {
    let total = 0;

    for (const item of state.cart) {
        total += item.priceAmount * item.qty;
    }
    console.log(total);

    return total;
}

export default cartSlice.reducer;
export const {
    addItem,
    removeItem,
    updateItem,
    resetCart
} = cartSlice.actions;