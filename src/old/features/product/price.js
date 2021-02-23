import { toInteger } from 'lodash';
import React from 'react';

import './styles/price.scss';

export default function Price({ 
    qty, 
    setQty, 
    prices, 
    stock,
    currPrice,
    setCurrPrice
}) {
    function changeHandler(e) {
        const { value } = e.target;
        setQty(value);
    }

    function findPrice() {
        const priceIdx = prices.findIndex((price, i) => {
            if ( prices[i] ) {
                return price.minQty <= qty && prices[i + 1]?.minQty > qty;
            } else {
                return prices[i].minQty <= qty;
            }
        });
    
        priceIdx >= 0 && setCurrPrice(priceIdx);
        console.log(priceIdx)
    }

    React.useEffect(() => {
        findPrice();
    }, [qty]);

    return (
        <div className="product-price">
            <div className="product-price_qty">
                <input 
                    onChange={ changeHandler } 
                    min="1" max={ stock } 
                    value={qty}
                    placeholder="кол-во (шт)" 
                    type="number" 
                    inputMode="numeric" 
                />
            </div>

            <div className="product-price_total">
                <span>{ `${ prices[currPrice].amount * qty }₽` }</span>
            </div>

            <div className="product-price_single">
                <span>{ `${ prices[currPrice].amount }₽/шт` }</span>
            </div>
        </div>
    );
}