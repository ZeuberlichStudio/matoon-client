import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    customer: {
        name: "",
        phone: "",
        mail: ""
    },
    contactMethod: {
        name: null,
        value: null
    },
    shippingMethod: {
        name: null,
        value: null
    },
    paymentMethod: {
        name: null,
        value: null
    }
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
                Object.assign(itemToUpdate, { 
                    price: payload.updateObj.price, 
                    qty: payload.updateObj.qty
                });
            }
        },
        clearOrderInfo: state => ({...initialState, items: state.items}),
        updateCustomerInfo: (state, {payload}) => { state.customer = {...state.customer, ...payload} },
        updateContactMethod: (state, {payload}) => { state.contactMethod = {...state.contactMethod, ...payload} },
        updateShippingMethod: (state, {payload}) => { state.shippingMethod = {...state.shippingMethod, ...payload} },
        updatePaymentMethod: (state, {payload}) => { state.paymentMethod = {...state.paymentMethod, ...payload} }
    }
});

const selectItems = state => state.cart.items;

const selectCustomerInfo = state => {
    const {customer} = state.cart,
    customerInfo = {...customer, valid: true};

    //validating customer info
    if ( !customer.name || !customer.phone || !customer.mail ) {
        customerInfo.valid = false;
        return customerInfo;
    }
    
    const phoneRe = /^\+7\s[(]\d{3}[)]\s\d{3}-\d{2}-\d{2}$/;
    const mailRe = /\S+@\S+\.\S+/;
    
    if ( !phoneRe.test(customer.phone) || !mailRe.test(customer.mail) ) {
        customerInfo.valid = false;
        return customerInfo;
    }

    return customerInfo;
};

const selectTotal = state => {
    let total = 0;
    for (const item of state.cart.items) {
        total = total + item.price * item.qty;
    }
    return total;
}

const selectContactMethod = state => {
    let valid;

    if ( !state.cart.contactMethod.value ) {
        valid = false;
    } else {
        valid = true;
    }

    return {...state.cart.contactMethod, valid};
}

const selectShippingMethod = state => {
    let valid;

    if ( !state.cart.shippingMethod.value ) {
        valid = false;
    } else {
        valid = true;
    }

    return {...state.cart.shippingMethod, valid};
}

const selectPaymentMethod = state => {
    const {paymentMethod} = state.cart;

    if ( !paymentMethod.name ) {
        return {...paymentMethod, valid: false};
    }

    if ( /^выставление сч[её]та$/.test(paymentMethod.name) ) {
        if (
            !paymentMethod.value.companyName ||
            !paymentMethod.value.companyAddress ||
            !/\d{10}/.test(paymentMethod.value.companyAccountNumber)
        ) {
            return {...paymentMethod, valid: false};
        }
    }

    return {...paymentMethod, valid: true};
}

export default cartSlice.reducer;
export const {
    addItem,
    removeItemByIndex,
    removeItemById,
    updateItem,
    clearOrderInfo,
    updateCustomerInfo,
    updateContactMethod,
    updateShippingMethod,
    updatePaymentMethod
} = cartSlice.actions;

export {
    selectItems,
    selectTotal,
    selectCustomerInfo,
    selectContactMethod,
    selectShippingMethod,
    selectPaymentMethod
};