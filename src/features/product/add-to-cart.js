import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '~/store/cart';
import { setModalElement } from '~/app/ui';

import './styles/add-to-cart.scss';

export default function ProductAddToCart({_id, variantId, qty, priceAmount}) {

    const dispatch = useDispatch();
    const isAdded = useSelector(state => state.cart).find(item => item.variantId === variantId);
    
    function add() {
        const item = {
            _id,
            variantId,
            qty,
            priceAmount
        }
        
        dispatch(addItem(item));
    }

    return (
        <div className={`product-add-to-cart ${isAdded ? 'added' : ''}`}>
            {
                !isAdded ?
                <button onClick={add}>
                    <span>Добавить в корзину</span>
                </button> :
                <button onClick={ () => dispatch(setModalElement('cart')) }>
                    <span>Перейти в корзину</span>
                </button>
            }
        </div>
    );
}

