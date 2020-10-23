import React from 'react';

import './styles/add-to-cart.scss';

export default function ProductAddToCart( { qty, itemId } ) {

    function addItem() {
        console.log( qty, itemId );
    }

    return (
        <div className="product-add-to-cart">
            <button onClick={ addItem }>
                <span>Добавить в корзину</span>
            </button>
        </div>
    );
}

