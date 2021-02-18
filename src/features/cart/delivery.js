import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList, { OptionsGroup } from './options';
import { selectShippingMethod, updateShippingMethod } from './slice';
import './styles/delivery/pc.scss';

function Delivery() {
    const dispatch = useDispatch();
    const shippingMethod = useSelector(selectShippingMethod);

    const shippingMethdosGroups = [
        {
            title: 'Варианты для г. Москва',
            optionsCallback: payload => dispatch(updateShippingMethod(payload)),
            options: [
                {
                    name: 'Самовывоз',
                    payload: { name: 'Самовывоз' },
                    detailsComponent: <PickupOptions/>
                },
                {
                    name: 'Курьер Matoon',
                    payload: { name: 'Курьер Matoon', value: '' },
                    detailsComponent: <ShippingAddressForm/>
                }
            ]
        },
        {
            title: 'Курьерские службы',
            optionsCallback: payload => dispatch(updateShippingMethod(payload)),
            globalDetailsComponent: <ShippingAddressForm/>,
            options: [
                {
                    name: 'СДЭК',
                    payload: { name: 'СДЭК', value: '' },
                    colorData: '#4FA33D'
                },
                {
                    name: 'Деловые Линии',
                    payload: { name: 'Деловые Линии', value: '' },
                    colorData: '#FCAF17'
                },
                {
                    name: 'Байкал Сервис',
                    payload: { name: 'Байкал Сервис', value: '' },
                    colorData: '#0086CB'
                },
                {
                    name: 'ПЭК',
                    payload: { name: 'ПЭК', value: '' },
                    colorData: '#242265'
                }
            ]
        },
        {
            title: 'Другое',
            optionsCallback: payload => dispatch(updateShippingMethod(payload)),
            options: [
                {
                    name: 'Предложить способ',
                    payload: { name: 'Предложенный способ', value: '' },
                    detailsComponent: <CustomShippingForm/>
                }
            ]
        }
    ]

    return (
        <div className="cart-delivery">
            <div className="cart-delivery_delivery-method">
                <OptionsList
                    title="Выберите удобный способ:"
                    groups={shippingMethdosGroups}
                />
            </div>
        </div>
    );
}

function ShippingAddressForm() {
    const shippingMethod = useSelector(selectShippingMethod);
    const dispatch = useDispatch();

    return (
        <>
            <label>
                <span>Желаемый адрес доставки</span>
                <input 
                    value={shippingMethod.value || ''}
                    onChange={e => dispatch(updateShippingMethod({ value: e.target.value }))} 
                    type="text"
                    placeholder="Например, г.Москва, ул. Солянка, д.2"
                />
            </label>
            <span>Рассчитанная стоимость доставки будет отправлена через выбранный Вами метод связи</span>
        </>
    );
}

function CustomShippingForm() {
    const shippingMethod = useSelector(selectShippingMethod);
    const dispatch = useDispatch();
    
    return (
        <textarea 
            value={shippingMethod.value || ''}
            onChange={e => dispatch(updateShippingMethod({ value: e.target.value }))} 
            type="text"
            placeholder="Опишите желаемый способ получения"
        ></textarea>
    );
}

function PickupOptions() {
    const dispatch = useDispatch();
    const shippingMethod = useSelector(selectShippingMethod);

    const PickupPointDetails = ({ address, mapUrl }) => (
        <>
            <span>{ address }</span>
            <a href={mapUrl}><u>Показать на карте</u></a>
        </>
    );

    const pickupPointsGroupConfig = {
        title: "Где вам будет удобнее забрать заказ?",
        optionsCallback: payload => dispatch(updateShippingMethod(payload)),
        options: [
            {
                name: 'м. Севастопольская',
                payload: { value: 'м. Севастопольская' },
                detailsComponent: <PickupPointDetails address="Большая Юшуньская ул., 1а, Москва, 117303" mapUrl=""/>,
                default: true
            },
            {
                name: 'м. Международная',
                payload: { value: 'м. Международная' },
                detailsComponent: <PickupPointDetails address="Большая Юшуньская ул., 1а, Москва, 117303" mapUrl=""/>
            }
        ]
    }; 

    return <OptionsGroup {...pickupPointsGroupConfig}/>;
}

export default Delivery;