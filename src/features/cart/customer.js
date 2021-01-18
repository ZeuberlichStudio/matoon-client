import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerInfo, updateContactOption } from './slice';
import OptionsList from './options';
import './styles/customer/pc.scss';

function Customer() {

    const { contactBy } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    function handleOption(option) {
        dispatch(updateContactOption({ option, details: null }));
    }

    function handleOptionDetails(details) {
        dispatch(updateContactOption({ details }));
    }

    const optionsGroups = [
        {
            title: 'Мессенджеры',
            globalDetailsComponent: <MessengerProfileForm {...{contactBy, handleOptionDetails}}/>,
            options: [
                {
                    name: 'Telegram',
                    colorData: '#21A0DC'
                },
                {
                    name: `What's App`,
                    colorData: '#71DD7E'
                },
                {
                    name: `Viber`,
                    colorData: '#8C67A9' 
                }
            ]
        },
        {
            title: 'Другое',
            options: [
                {
                    name: 'Эл.почта',
                    detailsRequired: false
                },
                {
                    name: `Телефон`,
                    detailsRequired: false
                }
            ]
        },
    ];

    return (
        <div className="cart-customer">
            <CustomerMainInfo/>
            <OptionsList 
                title="Как вам удобнее связаться для обсуждения деталей заказа:"
                groups={optionsGroups}
                optionCallback={handleOption}
            />
        </div>
    );
}

function CustomerMainInfo() {

    const { customer } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    function handleField(e) {
        const { name, value } = e.target;
        dispatch(updateCustomerInfo({ [name]: value }))
    }

    return (
        <div className="cart-customer_main-info">
            <h3>Представьтесь, пожалуйста</h3>

            <label>
                <span>Ваше имя</span>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Например, Андрей" 
                    onChange={handleField}
                    value={customer.name || ''}
                />
            </label>

            <label>
                <span>И номер телефона</span>
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="+7 (123) 456-78-90" 
                    onChange={handleField}
                    value={customer.phone || ''}
                />
            </label>

            <label>
                <span>Ваша электронная почта</span>
                <input 
                    type="text" 
                    name="mail" 
                    placeholder="Example@gmail.com" 
                    onChange={handleField}
                    value={customer.mail || ''}
                />
            </label>
        </div>
    );
}

const MessengerProfileForm = ({ contactBy, handleOptionDetails }) => {
    return (
        <>
            <label>
                <span>Имя пользователя или ссылка на профиль</span>
                <input type="text" value={contactBy.details || ''} onChange={e => handleOptionDetails(e.target.value)}/>
            </label>
        </>
    );
}

export default Customer;