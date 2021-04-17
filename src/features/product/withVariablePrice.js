import React from 'react';

function withVariablePrice(Component) {
    function ItemWithVariablePrice({initQty, prices, stock, ...props}) {
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

        const [qty, setQty] = React.useState(1);

        function qtyFieldHandler(e) {    
            if ( e.target.value <= stock ) setQty(value);
        }

        React.useEffect(() => setQty(initQty), [initQty]);
    
        const [priceIdx, setPriceIdx] = React.useState(0);
    
        function findPrice() {
            const priceIdx = computedPrices.findIndex(({minQty, maxQty}) => (
                maxQty ? (qty >= minQty && qty < maxQty) : true
            ));
            
            setPriceIdx(priceIdx < 0 ? 0 : priceIdx);
        }
    
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