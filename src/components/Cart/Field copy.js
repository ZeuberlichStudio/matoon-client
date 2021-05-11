import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldValue, validateFieldValue, selectFieldValue, selectFieldValidation } from '~/store/order-form';

import './styles/field.scss';

export default function Field({ name, label, placeholder, textarea, style }) {
    const dispatch = useDispatch();
    const value = useSelector(state => selectFieldValue(state, name));
    const valid = useSelector(state => selectFieldValidation(state, name));

    function handleChange(e) {
        const { name, value } = e.target;
        dispatch(changeFieldValue({ name, value }));
        dispatch(validateFieldValue({ name, value }));
    }

    // React.useEffect(() => function() { dispatch(validateFieldValue({ name, value })); }, []);

    return (
        <label className={`field ${value && !valid ? 'danger' : ''}`} style={style}>
            <span className="field--label">{label}</span>
            {
                textarea ?
                <textarea 
                    name={name}
                    value={value || ''}
                    onChange={handleChange} 
                    className="field--textarea"
                    placeholder={placeholder}
                ></textarea> :
                <input 
                    name={name} 
                    value={value || ''}
                    onChange={handleChange} 
                    type="text" 
                    className="field--input"
                    placeholder={placeholder}
                />
            }
        </label>
    );
}