import React from 'react';

import './styles/price.scss';

export default function Price({ stock, price }) {

    const [qty, setQty] = React.useState(1);

    function changeHandler(e) {
        const { value } = e.target;

        if ( !value ) setQty( 1 );
        else if ( value <= 0  ) {
            e.target.value = 1;
            return setQty( 1 );
        }
        else setQty( value ? value : 1 );
    }

    return (
        <div className="product-price">
            <div className="product-price_qty">
                <input onChange={ changeHandler } min="1" max={ stock } placeholder="кол-во (шт)" type="number"/>
            </div>

            <div className="product-price_total">
                <span>{ `${ price * qty }₽` }</span>
            </div>

            <div className="product-price_single">
                <span>{ `${ price }₽/шт` }</span>
            </div>
        </div>
    );
}