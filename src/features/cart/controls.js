import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotal } from './slice';
import Button from 'features/button';

function CartControls({ 
    button, 
    isValid,
    showTotal = true
}) {
    const total = showTotal && useSelector(selectTotal);

    return (
        <div className="cart-controls">
            {
                total &&
                <ul className="cart-controls_cost">
                    <li>
                        <span>Общая стоимость</span>
                        <hr/>
                        <span>{total}₽</span>
                    </li>
                </ul>
            }

            <Button 
                onClick={() => isValid && button?.callback()}
                text={button?.text} 
                className={`cart-controls_next ${isValid ? 'valid' : 'invalid'}`} 
            />
        </div>
    );
}

export default CartControls;