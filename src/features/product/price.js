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
    const [computedPrices, setComputedPrices] = React.useState([]);

    function computePrices() {
        const computedPrices = [];

        prices.forEach((price, index) => {
            computedPrices[index] = {
                minQty: price.minQty,
                maxQty: prices[index + 1]?.minQty - 1 ?? null,
                amount: price.amount
            }
        });

        return computedPrices;
    }

    React.useEffect(() => setComputedPrices(computePrices()), [prices]);

    function changeHandler(e) {    
        const {value} = e.target;
        if ( value <= stock ) setQty(value);
    }
    
    function findPrice() {
        const index = computedPrices.findIndex(({minQty, maxQty}) => (
            maxQty ? (qty >= minQty && qty < maxQty) : true
        ));
        
        setCurrPrice(index < 0 ? 0 : index);
    }

    React.useEffect(() => findPrice(), [qty]);

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