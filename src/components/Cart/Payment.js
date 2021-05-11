import React from 'react';
import Field from './Field';
import Select from './Select';
import { useSelector } from 'react-redux';
import { selectFieldValue } from '~/store/order-form';

const personOptions  = [
    {
        name: `Наличными`,
        value: 'cash'
    },
    {
        name: 'Перевод на карту',
        value: 'transfer'
    }
]

const companyOptions  = [
    {
        name: `Выставление счёта`,
        value: 'bill'
    }
]

export default function Customer() {
    const paymentMethodValue = useSelector(state => selectFieldValue(state, 'payment.method'));
    const [currGroup, setCurrGroup] = React.useState(null);

    React.useEffect(() => setCurrGroup(
        paymentMethodValue === 'cash' || paymentMethodValue === 'transfer' ? 0 : 
        paymentMethodValue === 'bill' ? 1 : null
    ), [paymentMethodValue]);

    return (
        <>
            <div className={`cart_step--content--group ${currGroup === 0 ? 'active' : ''}`}>
                <Select name="payment.method" label="Физическим лицам" options={personOptions}/>
            </div>

            <div  className={`cart_step--content--group ${currGroup === 1 ? 'active' : ''}`}>
                <Select name="payment.method" label="Юридическим лицам" options={companyOptions}/>
                { 
                    paymentMethodValue === 'bill' && 
                    <>
                        <Field 
                            name="payment.inn" 
                            label="ИНН" 
                            mask="999999999999"
                        />
                        <Field 
                            name="payment.companyName" 
                            label="Название компании"
                        />
                        <Field 
                            name="payment.companyAddress" 
                            label="Юридический адрес"
                        />
                    </>
                }
            </div>
        </>
    );
}
