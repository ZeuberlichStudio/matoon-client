import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { updateCustomerInfo, selectContactMethod, updateContactMethod } from './slice';
import { selectCustomerInfo } from './slice';
import OptionsList from './options';

import './styles/contact/pc.scss';

function Contact() {

    const customerInfo = useSelector(selectCustomerInfo);
    const dispatch = useDispatch();

    const contactMethodsGroups = [
        {
            title: 'Мессенджеры',
            globalDetailsComponent: <MessengerProfileForm/>,
            optionsCallback: payload => dispatch(updateContactMethod(payload)),
            options: [
                {
                    name: 'Telegram',
                    colorData: '#21A0DC',
                    payload: { name: 'Telegram', value: '' }
                },
                {
                    name: `What's App`,
                    colorData: '#71DD7E',
                    payload: { name: `What's App`, value: '' }
                },
                {
                    name: `Viber`,
                    colorData: '#8C67A9',
                    payload: { name: `Viber`, value: '' }
                }
            ]
        },
        {
            title: 'Другое',
            optionsCallback: payload => dispatch(updateContactMethod(payload)),
            options: [
                {
                    name: 'Эл.почта',
                    payload: { name: 'Эл.почта', value: customerInfo.mail },
                    dependancy: customerInfo.mail
                },
                {
                    name: `Телефон`,
                    payload: { name: 'Телефон', value: customerInfo.phone },
                    dependancy: customerInfo.phone
                }
            ]
        },
    ];

    return (
        <div className="cart-contact">
            <CustomerForm/>
            <div className="cart-contact_contact-method">
                <OptionsList 
                    title="Как вам удобнее связаться для обсуждения деталей заказа:"
                    groups={contactMethodsGroups}
                />
            </div>
        </div>
    );
}

function CustomerForm({ invalidShown }) {

    const customerInfo = useSelector(selectCustomerInfo);
    const dispatch = useDispatch();

    function handleField(e) {
        const { name, value } = e.target;
        dispatch(updateCustomerInfo({ [name]: value }))
    }
    
    return (
        <form className="cart-contact_customer-form">
            <h3>Представьтесь, пожалуйста</h3>

            <label>
                <span>Ваше имя</span>
                <input
                    type="text" 
                    name="name" 
                    onChange={handleField}
                    value={customerInfo.name || ''}
                    placeholder="Например, Андрей" 
                />
            </label>

            <label>
                <span>И номер телефона</span>
                <NumberFormat 
                    type="tel" 
                    name="phone" 
                    format="+7 (###) ###-##-##"
                    mask="_"
                    placeholder="+7 (999) 888-77-66" 
                    onChange={handleField}
                    value={customerInfo.phone || ''}
                />
            </label>

            <label>
                <span>Ваша электронная почта</span>
                <input 
                    type="email"
                    name="mail" 
                    placeholder="Example@gmail.com" 
                    onChange={handleField}
                    value={customerInfo.mail || ''}
                />
            </label>
        </form>
    );
}

function MessengerProfileForm({invalidShown}) {
    const contactMethod = useSelector(selectContactMethod);
    const dispatch = useDispatch();

    return (
        <>
            <label>
                <span>Имя пользователя или ссылка на профиль</span>
                <input 
                    value={contactMethod.value || ''} 
                    onChange={e => dispatch(updateContactMethod({ value: e.target.value }))}
                    type="text" 
                />
            </label>
        </>
    )
}

export default Contact;