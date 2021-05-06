import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotal } from '~/store/cart';

import './styles/step.scss';

export default function step({
    title,
    component,
    closeButton,
    goForward,
    goBack,
    complete,
    index,
    totalSteps,
    footer = true,
    submit
}) {
    const total = useSelector(selectTotal);
    const targetDevice = useSelector( state => state.device.target );
    const mobileScrollableStyle = { 
        overflowX: 'hidden', 
        overflowY: 'scroll', 
        '-webkit-overflow-scrolling': 'touch',
        '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
        maskImage: 'radial-gradient(white, black)'
    }

    return (
        <div style={targetDevice == 'mobile' ? mobileScrollableStyle : null} className="cart_step_wrapper">
        <div className="cart_step">
            <div className="cart_step--header">
                { index > 0 && index < totalSteps - 1 && <button onClick={goBack} className="cart_step--header--go_back"/> }
                <span className="cart_step--header--title">{title || 'Корзина'}</span>
                {closeButton}
            </div>
            <div className="cart_step--content">
                {component}
            </div>
            {
                footer &&
                <div className="cart_step--footer">
                    <div className="cart_step--footer--total">
                        <span>Общая стоимость</span>
                        <hr/>
                        <span>{total}₽</span>
                    </div>

                    <button 
                        onClick={() => {
                            if ( index === totalSteps - 2 ) complete && submit();
                            else complete && goForward();
                        }} 
                        className="cart_step--footer--go_forward"
                        style={{ opacity: !complete && '.5' }}
                    >
                        { index === totalSteps - 1 ? 'Оформить' : 'Далее' }
                    </button>
                </div>
            }
        </div>
        </div>
    );
}