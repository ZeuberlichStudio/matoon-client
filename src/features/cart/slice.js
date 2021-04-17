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
        addItem( state, { payload } ) { state.items.push(payload); },
        removeItem(state, {payload}) {
            const index = state.items.findIndex(({_id, variantId}) => (
                _id === payload._id,
                variantId === payload.variantId
            ));

            state.items.splice(index, 1);
        },
        updateItem( state, { payload } ) {
            const itemToUpdate = state.items.find(({_id, variantId}) => (
                _id === payload._id,
                variantId === payload.variantId
            )); 

            if ( !itemToUpdate ) return state;
            else Object.assign(itemToUpdate, payload);
        },
        clearOrderInfo(state) { return {...initialState, items: state.items}},
        updateCustomerInfo(state, {payload}) { state.customer = {...state.customer, ...payload} },
        updateContactMethod(state, {payload}) { state.contactMethod = {...state.contactMethod, ...payload} },
        updateShippingMethod(state, {payload}) { state.shippingMethod = {...state.shippingMethod, ...payload} },
        updatePaymentMethod(state, {payload}) { state.paymentMethod = {...state.paymentMethod, ...payload} }
    }
});

const selectItem = (state, _id) => state.cart.items.find(item => item._id === _id);

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
        total += item.priceAmount * item.qty;
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
    removeItem,
    updateItem,
    clearOrderInfo,
    updateCustomerInfo,
    updateContactMethod,
    updateShippingMethod,
    updatePaymentMethod
} = cartSlice.actions;

export {
    selectItem,
    selectItems,
    selectTotal,
    selectCustomerInfo,
    selectContactMethod,
    selectShippingMethod,
    selectPaymentMethod
};