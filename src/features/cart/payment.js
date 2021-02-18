import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from './options';
import { selectPaymentMethod, updatePaymentMethod } from './slice';
import './styles/payment/pc.scss';

function Payment() {
    const dispatch = useDispatch();

    const paymentMethodsGroups = [
        {
            title: 'Физическое лицо',
            optionsCallback: payload => dispatch(updatePaymentMethod(payload)),
            options: [
                {
                    name: 'Наличными',
                    payload: { name: 'Наличными', value: '' }
                },
                {
                    name: 'Перевод на карту',
                    payload: { name: 'Перевод на карту', value: '' }
                },
                {
                    name: 'Сервисы экспресс-переводов',
                    payload: { name: 'Сервисы экспресс-переводов', value: '' }
                }
            ]
        },
        {
            title: 'Юридическое лицо',
            optionsCallback: payload => dispatch(updatePaymentMethod(payload)),
            options: [
                {
                    name: 'Выставление счёта',
                    payload: { 
                        name: 'Выставление счёта', 
                        value: { 
                            companyName: '', 
                            companyAddress: '', 
                            companyAccountNumber: '' 
                        } 
                    },
                    detailsComponent: <InvoiceForm/>
                }
            ]
        }
    ]

    return (
        <div className="cart-payment">
            <div className="cart-payment_payment-method">
                <OptionsList
                    title="Выберите удобный способ:"
                    groups={paymentMethodsGroups}
                />
            </div>
        </div>
    );
}

function InvoiceForm() {
    const dispatch = useDispatch();
    const paymentMethod = useSelector(selectPaymentMethod);

    function handleField(e) {
        const { name, value } = e.target;

        dispatch(updatePaymentMethod({ value: {...paymentMethod.value, [name]: value } }));
    }

    return (
        <>
            <span>
                Укажите ваши реквизиты, мы выставим<br/>
                вам счёт после формирования заказа 
            </span>

            <label>
                <span>Полное наименование организации</span>
                <input 
                    value={paymentMethod.value?.companyName || ''}
                    onChange={handleField}
                    type="text"
                    name="companyName"
                    placeholder="Например: ООО “ЭЙ БИ СИ”"
                />
            </label>

            <label>
                <span>Юридический адрес организации</span>
                <input 
                    value={paymentMethod.value?.companyAddress || ''}
                    onChange={handleField}
                    type="text"
                    name="companyAddress"
                    placeholder="Например: Большая Юшуньская ул., 1а, Москва"
                />
            </label>

            <label>
                <span>ИНН организации</span>
                <input 
                    value={paymentMethod.value?.companyAccountNumber || ''}
                    onChange={handleField}
                    type="tel"
                    maxLength="10"
                    name="companyAccountNumber"
                    placeholder="0123456789"
                />
            </label>
        </>
    );
}

export default Payment;