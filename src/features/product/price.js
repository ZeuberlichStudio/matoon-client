import React from 'react';

import './styles/price.scss';

export default function Price({ stock, prices, salePrices }) {

    const [qty, setQty] = React.useState(1);
    const [currPrice, setCurrPrice] = React.useState(0);

    // function changeHandler(e) {
    //     const { value } = e.target;

    //     if ( !value ) setQty( 1 );
    //     else if ( value <= 0  ) {
    //         e.target.value = 1;
    //         return setQty( 1 );
    //     }
    //     else setQty( value ? value : 1 );
    // }

    // function findPrice() {
    //     const price = prices.find( ({ minQty, maxQty }) => {
    //         if ( maxQty ) {
    //             return qty >= minQty && qty <= maxQty;
    //         } else {
    //             return true;
    //         }
    //     });

    //     setPrice(price);
    // }

    function changeHandler(e) {
        const { value } = e.target;

        if ( value <= 0  ) {
            e.target.value = 1;
            return setQty( 1 );
        }

        setQty(value);
    }

    function findPrice() {
        const currPrice = prices.findIndex((price, i) => {
            if ( prices[i] ) {
                return price.minQty <= qty && prices[i + 1]?.minQty > qty;
            } else {
                return prices[i].minQty <= qty;
            }
        });
        console.log(currPrice)
        currPrice >= 0 && setCurrPrice(currPrice);
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