import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldValue, validateFieldValue, selectFieldValue } from '~/store/order-form';

import './styles/select.scss';

export default function Select({ name, options, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => selectFieldValue(state, name));

    function handleChange(e) {
        const { value } = e.target;
        dispatch(changeFieldValue({ name, value }));
    }

    return (
        <div className="select">
            <span className="select--label">{label}</span>
            <div className="select--options">
            { 
                options.map((option, i) => (
                    <label key={i} className="select--options--option" style={{ '--color': option.color }}>
                        <input onChange={handleChange} type="checkbox" value={option.value} checked={option.value === value}/>
                        <span>{option.name}</span>
                    </label>
                ))
            }
            </div>
        </div>
    );
}