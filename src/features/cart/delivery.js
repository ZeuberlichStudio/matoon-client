import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList, { OptionsGroup } from './options';
import { updateShipping } from './slice';
import './styles/delivery/pc.scss';

function Delivery() {

    const shippingStore = useSelector(state => state.cart.shipping)
    const dispatch = useDispatch();

    function handleOption(option) {
        dispatch(updateShipping({option, details: '' }));
    }

    function handleDetails(details) {
        dispatch(updateShipping({...shippingStore, details }));
    }

    React.useEffect(() => console.log(shippingStore), [shippingStore]);

    const optionsGroups = [
        {
            title: 'Варианты для г. Москва',
            options: [
                {
                    name: 'Самовывоз',
                    detailsComponent: <PickupDeliveryDetails {...{shippingStore, handleDetails}}/>
                },
                {
                    name: 'Курьер Matoon',
                    detailsComponent: <CourierDeliveryDetails {...{shippingStore, handleDetails}}/>
                }
            ]
        },
        {
            title: 'Курьерские службы',
            globalDetailsComponent: <CourierDeliveryDetails {...{shippingStore, handleDetails}}/>,
            options: [
                {
                    name: 'СДЭК',
                    colorData: '#4FA33D'
                },
                {
                    name: 'Деловые Линии',
                    colorData: '#FCAF17'
                },
                {
                    name: 'Байкал Сервис',
                    colorData: '#0086CB'
                },
                {
                    name: 'ПЭК',
                    colorData: '#242265'
                }
            ]
        },
        {
            title: 'Другое',
            options: [
                {
                    name: 'Предложить способ',
                    detailsComponent: <CustomDeliveryDetails/>
                }
            ]
        }
    ]

    return (
        <div className="cart-delivery">
            <OptionsList
                title="Выберите удобный способ:"
                groups={optionsGroups}
                optionCallback={handleOption}
            />
        </div>
    );
}

const CourierDeliveryDetails = ({shippingStore, handleDetails}) => (
    <>
        <label htmlFor="">
            <span>Желаемый адрес доставки</span>
            <input 
                name="deliver-to" 
                placeholder="Например, г.Москва, ул. Солянка, д.2"
                type="text"
                onChange={e => handleDetails(e.target.value)} 
                value={shippingStore.details || ''}
            />
        </label>
        <p>Рассчитанная стоимость доставки будет отправлена через выбранный Вами метод связи</p>
    </>
);


function PickupDeliveryDetails() {

    const PickupPointDetails = ({ address, mapUrl }) => (
        <>
            <span>{ address }</span>
            <a href={mapUrl}><u>Показать на карте</u></a>
        </>
    );

    const pickupPoints = [
        {
            name: 'м. Севастопольская',
            detailsComponent: <PickupPointDetails address="Большая Юшуньская ул., 1а, Москва, 117303" mapUrl=""/>
        },
        {
            name: 'м. Международная',
            detailsComponent: <PickupPointDetails address="Большая Юшуньская ул., 1а, Москва, 117303" mapUrl=""/>
        }
    ]; 

    const selectGroup = () => {};

    return (
        <OptionsGroup 
            title="Где вам будет удобнее забрать заказ?"
            options={pickupPoints} 
            defaultOption="0"
            active={false} 
            {...{selectGroup}}
        />
    );
}

const CustomDeliveryDetails = () => (
    <textarea name="" placeholder="Опишите желаемый способ получения"></textarea>
);

export default Delivery;