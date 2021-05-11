import React from 'react';
import Field from './Field';
import Select from './Select';
import { useSelector } from 'react-redux';
import { selectFieldValue } from '~/store/order-form';

const messengerOptions = [
    {
        name: 'Telegram',
        value: 'tg',
        color: '#21A0DC'
    },
    {
        name: `What's App`,
        value: 'wapp',
        color: '#71DD7E'
    },
    {
        name: 'Viber',
        value: 'viber',
        color: '#8C67A9'
    }
]

const otherContactOptions = [
    {
        name: 'Телефон',
        value: 'phone'
    },
    {
        name: 'Почта',
        value: 'mail'
    }
]

export default function Customer() {
    const contactByValue = useSelector(state => selectFieldValue(state, 'customer.contactBy'));
    
    return (
        <>
            <h3 className="cart_step--content--header">Представьтесь, пожалуйста:</h3>
            <div className="cart_step--content--group">
                <Field 
                    name="customer.name" 
                    label="Имя" 
                    placeholder="Ваше имя"
                    style={{ gridColumn: '1/2' }}
                />
                <Field 
                    name="customer.phone" 
                    label="Телефон" 
                    mask="+7 (999) 999 9999" 
                    placeholder="+7 (999) 888 7766"
                    style={{ gridColumn: '2/3' }}
                />
                <Field 
                    name="customer.mail" 
                    label="Почта" 
                    placeholder="name@domain.com"
                    style={{ gridColumn: '1/3' }}
                />
            </div>
            <h3 className="cart_step--content--header">Как вам удобнее связаться<br/> для обсуждения деталей заказа:</h3>
            <div className={`cart_step--content--group ${
                ( contactByValue === 'wapp' || contactByValue === 'tg' || contactByValue === 'viber' ) ? 'active' : ''
            }`}>
                <Select name="customer.contactBy" label="Мессенджеры" options={messengerOptions} />
                { 
                    // ( contactByValue === 'wapp' || contactByValue === 'tg' || contactByValue === 'viber' ) && 
                    // <p>Через профиль, привязанный к указанному выше телефону</p> 
                }
            </div>
            <div className={`cart_step--content--group ${contactByValue === 'mail' || contactByValue === 'phone' ? 'active' : ''}`}>
                <Select name="customer.contactBy" label="Другое" options={otherContactOptions} />
            </div>
        </>
    );
}
