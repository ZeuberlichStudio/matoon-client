import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: {
        name: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        },
        phone: {
            value: false,
            valid: false,
            validate(value) { return value && /^\D*(\d\D*){11}$/.test(value); }
        },
        mail: {
            value: null,
            valid: false,
            validate(value) { return value && /\S+@\S+\.\S+/.test(value); }     
        },
        contactBy: { value: null }
    },
    shipping: {
        method: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        },
        address: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        },
        pickupPoint: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        },
        comment: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        }
    },
    payment: {
        method: {
            value: null,
            valid: false,
            validate(value) { return !!value; }
        },
        inn:  {
            value: null,
            valid: false,
            validate(value) {
                const { method } = this.payment;
                const re = /^(\d{10}|\d{12})$/;
                return method.value === 'bill' ? re.test(value) : true;
            }
        },
        companyName:  {
            value: null,
            valid: false,
            validate(value) {
                const { method } = this.payment;
                return method.value === 'bill' ? !!value : true;
            }
        },
        companyAddress:  {
            value: null,
            valid: false,
            validate(value) {
                const { method } = this.payment;
                return method.value === 'bill' ? !!value : true;
            }
        }
    }
};

const orderFormSlice = createSlice({
    name: 'orderForm',
    initialState,
    reducers: {
        changeFieldValue(state, action) {
            const { name, value } = action.payload;
            const property = name.split('.').reduce((acc, next) => acc[next], state);

            property.value = value;
        },
        validateFieldValue(state, action) {
            const { name, value } = action.payload;
            const property = name.split('.').reduce((acc, next) => acc[next], state);

            property.valid = property.validate.bind(state)(value);
        },
        resetOrderForm() {
            return initialState;
        }
    }
});

export function selectFieldValue(state, name) {
    return name.split('.').reduce((acc, next) => acc[next], state.orderForm).value;
}

export function selectFieldValidation(state, name) {
    return name.split('.').reduce((acc, next) => acc[next], state.orderForm).valid;
}

export function selectCustomerStepCompletion(state) {
    const { name, phone, mail, contactBy, whatsapp, telegram, viber } = state.orderForm.customer;

    if ( !name.valid || !phone.valid || !mail.valid ) return false;
    else if ( !contactBy.value ) return false;
    else return true;
}

export function selectShippingStepCompletion(state) {
    const { method, pickupPoint, address, comment } = state.orderForm.shipping;

    if ( !method.value ) return false;
    else if ( method.value === 'pickup' && !pickupPoint.value ) return false;
    else if ( 
        (
            method.value === 'carrier' || method.value === 'sdek' ||
            method.value === 'pek' || method.value === 'baikalserv' ||
            method.value === 'dellin' 
        ) && 
        !address.valid 
    ) return false;
    else if ( method.value === 'custom' && !comment.valid ) return false;
    else return true;
}

export function selectPaymentStepCompletion(state) {
    const { method, inn, companyName, companyAddress} = state.orderForm.payment;

    if ( !method.value ) return false;
    else if ( method.value === 'bill' && (!inn.valid || !companyName.valid || !companyAddress.valid) ) return false;
    else return true;
}

export function selectFormData(state) {
    const { customer, shipping, payment } = state.orderForm;

    const formData = {
        customer: {
            name: customer.name.value,
            phone: customer.phone.value,
            mail: customer.mail.value,
            contactBy: customer.contactBy.value
        },
        shipping: {
            method: shipping.method.value,
            address: shipping.address.value,
            pickupPoint: shipping.pickupPoint.value,
            comment: shipping.comment.value
        },
        payment: {
            method: payment.method.value,
            inn: payment.inn.value,
            companyName: payment.companyName.value,
            companyAddress: payment.companyAddress.value
        }
    }

    return formData;
}

export default orderFormSlice.reducer;
export const { changeFieldValue, validateFieldValue, resetOrderForm } = orderFormSlice.actions;