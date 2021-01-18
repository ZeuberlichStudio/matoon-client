import React from 'react';
import OptionsList, { OptionsGroup } from './options';

function Payment() {

    const optionsGroups = [
        {
            title: 'Физическое лицо',
            options: [
                {
                    name: 'Наличными'
                },
                {
                    name: 'Перевод на карту'
                },
                {
                    name: 'Сервисы экспресс-переводов'
                }
            ]
        },
        {
            title: 'Юридическое лицо',
            options: [
                {
                    name: 'Безналичный расчет',
                    detailsComponent: <BillPaymentDetails/>
                },
                {
                    name: 'Выставление счёта',
                    detailsComponent: <BillPaymentDetails/>
                }
            ]
        }
    ]

    return (
        <div className="cart-delivery">
            <OptionsList
                title="Выберите удобный способ:"
                groups={optionsGroups}
            />
        </div>
    );
}

const BillPaymentDetails = () => (
    <>
        <span>
            Укажите ваши реквизиты, мы выставим<br/>
            вам счёт после формирования заказа 
        </span>

        <label>
            <span>Полное наименование организации</span>
            <input 
                type="text"
                name=""
                placeholder="Например: ООО “ЭЙ БИ СИ”"
                value={''}
            />
        </label>

        <label>
            <span>Юридический адрес организации</span>
            <input 
                type="text"
                name=""
                placeholder="Например: Большая Юшуньская ул., 1а, Москва"
                value={''}
            />
        </label>

        <label>
            <span>ИНН/КПП организации</span>
            <input 
                type="text"
                name=""
                placeholder="123456789"
                value={''}
            />
        </label>
    </>
);

export default Payment;