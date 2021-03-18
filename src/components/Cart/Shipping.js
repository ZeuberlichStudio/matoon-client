import React from 'react';
import Field from './Field';
import Select from './Select';
import { useSelector } from 'react-redux';
import { selectFieldValue } from '~/store/order-form';

const storeServices  = [
    {
        name: `Самовывоз`,
        value: 'pickup'
    },
    {
        name: 'Курьер магазина',
        value: 'carrier'
    }
]

const shippingServices = [
    {
        name: `СДЭК`,
        value: 'sdek'
    },
    {
        name: `Деловые Линии`,
        value: 'dellin'
    },
    {
        name: `Байкал Сервис`,
        value: 'baikalserv'
    },
    {
        name: `ПЭК`,
        value: 'pek'
    }
]

const otherOptions  = [
    {
        name: `Предложить способ`,
        value: 'custom'
    }
]

const pickupPoints = [
    {
        name: 'м. Севастопольская',
        value: 'м. Севастопольская'
    },
    {
        name: 'м. Международная',
        value: 'м. Международная'
    }
]

export default function Customer() {
    const shippingMethodValue = useSelector(state => selectFieldValue(state, 'shipping.method'));
    const [currGroup, setCurrGroup] = React.useState(null);

    React.useEffect(() => setCurrGroup(
        shippingMethodValue === 'pickup' || shippingMethodValue === 'carrier' ? 0 :
        shippingMethodValue === 'sdek' || shippingMethodValue === 'dellin' || 
        shippingMethodValue === 'baikalserv' || shippingMethodValue === 'pek' ? 1 :
        shippingMethodValue === 'custom' ? 2 : null
    ), [shippingMethodValue]);
    
    return (
        <>
            <div className={`cart_step--content--group ${currGroup === 0 ? 'active' : ''}`}>
                <Select name="shipping.method" label="Варианты для г. Москва" options={storeServices}/>
                { 
                    shippingMethodValue === 'pickup' && 
                    <Select name="shipping.pickupPoint"  label="Пункты самовывоза" options={pickupPoints}/> 
                }
                { 
                    shippingMethodValue === 'carrier' && 
                    <Field name="shipping.address" label="Адрес доставки"/> 
                }
            </div>
            <div className={`cart_step--content--group ${currGroup === 1 ? 'active' : ''}`}>
                <Select name="shipping.method" label="Курьерские доставки" options={shippingServices}/>
                {
                    ( shippingMethodValue === 'sdek' || shippingMethodValue === 'dellin' ||
                    shippingMethodValue === 'baikalserv' || shippingMethodValue === 'pek' ) &&
                    <Field name="shipping.address" label="Адрес доставки"/> 
                }
            </div>
            <div className={`cart_step--content--group ${currGroup === 2 ? 'active' : ''}`}>
                <Select name="shipping.method" label="Свой способ" options={otherOptions}/>
                { shippingMethodValue === 'custom' && <Field name="shipping.comment" label="Описание способа доставки" textarea/> }
            </div>
        </>
    );
}
