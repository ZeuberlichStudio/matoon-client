import React from 'react';
import Button from '~/features/button';

function CartHeader({ title, goBack, closeButton }) {
    return (
        <div className="cart-header">
            { goBack && <Button className="cart-header_back" onClick={goBack}/> }
            <span>{title || 'Корзина'}</span>
            { closeButton }
        </div>
    );
}

export default CartHeader;