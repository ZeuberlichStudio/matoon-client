import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModalElement } from '~/app/ui';
import { toggleUI } from '~/features/modal-ui';

import './styles/empty.scss';

function CartEmpty() {
    const dispatch = useDispatch();
    const modalElement = useSelector( ({ui}) => ui.modalElement );

    const menuRedirect = () => toggleUI( dispatch, setModalElement, modalElement, 'menu' );

    return (
        <div className="cart-empty">
            <div className="cart-empty_content">
                <h3>У вас пока нет товаров, <br className="pc-hide"/> добавленных в корзину</h3>
                <p>
                    Но вы непременно найдёте что-то интересное в&nbsp;
                    <button onClick={ menuRedirect }>меню-категорий</button>!
                </p>
            </div>
        </div>
    )
};

export default CartEmpty;