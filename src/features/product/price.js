import React from 'react';

import './styles/price.scss';

export default function Price({ stock, prices, salePrices }) {

    const [qty, setQty] = React.useState(1);
    const [price, setPrice] = React.useState({});

    function changeHandler(e) {
        const { value } = e.target;

        if ( !value ) setQty( 1 );
        else if ( value <= 0  ) {
            e.target.value = 1;
            return setQty( 1 );
        }
        else setQty( value ? value : 1 );
    }

    function findPrice() {
        const price = prices.find( ({ minQty, maxQty }) => {
            if ( maxQty ) {
                return qty >= minQty && qty <= maxQty;
            } else {
                return true;
            }
        });

        setPrice(price);
    }

    React.useEffect(() => {
        if ( qty > price.minQty && qty < price.maxQty ) return;
        else findPrice();
    }, [qty]);

    return (
        <div className="product-price">
            <div className="product-price_qty">
                <input onChange={ changeHandler } min="1" max={ stock } placeholder="кол-во (шт)" type="number" inputmode="numeric" />
            </div>

            <div className="product-price_total">
                <span>{ `${ price.amount * qty }₽` }</span>
            </div>

            <div className="product-price_single">
                <span>{ `${ price.amount }₽/шт` }</span>
            </div>
        </div>
    );
}