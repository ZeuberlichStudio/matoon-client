import React from 'react';

function withVariablePrice(Component) {
    function ItemWithVariablePrice({initQty, prices, stock, ...props}) {
        //quantity
        const [qty, setQty] = React.useState(1);

        function qtyFieldHandler(e) {
            const { value } = e.target;
    
            if ( value > stock ) return;
            else if ( value <= 0  ) {
                e.target.value = 1;
                return setQty(1);
            }
    
            setQty(value);
        }

        React.useEffect(() => setQty(initQty), [initQty]);
    
        //price
        const [priceIdx, setPriceIdx] = React.useState(0);
    
        function findPrice() {
            const priceIdx = prices.findIndex((price, i) => {
                if ( prices[i] ) {
                    return price.minQty <= qty && prices[i + 1]?.minQty > qty;
                } else {
                    return prices[i].minQty <= qty;
                }
            });
        
            priceIdx >= 0 && setPriceIdx(priceIdx);
        }
    
        //setting the right price
        React.useEffect(() => findPrice(), [qty]);

        return (
            <Component {...{
                    qty, 
                    qtyFieldHandler, 
                    price: prices[priceIdx].amount, 
                    ...props
                }} 
            />
        );
    }

    return ItemWithVariablePrice;
}

export default withVariablePrice;