import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '~/features/cart/slice';
import { setModalElement } from '~/app/ui';

import './styles/add-to-cart.scss';

export default function ProductAddToCart({ 
    varId,
    sku,
    price,
    qty
}) {

    const dispatch = useDispatch();
    const isAdded = useSelector(state => state.cart.items).findIndex(item => item._id === varId) > -1;
    
    function test() {
        dispatch(addItem({ _id: varId, sku, price, qty }));
        console.log({ _id: varId, sku, price, qty });
    }

    return (
        <div className={`product-add-to-cart ${isAdded ? 'added' : ''}`}>
            {
                !isAdded ?
                <button onClick={test}>
                    <span>Добавить в корзину</span>
                </button> :
                <button onClick={ () => dispatch(setModalElement('menu')) }>
                    <span>Перейти в корзину</span>
                </button>
            }
        </div>
    );
}

