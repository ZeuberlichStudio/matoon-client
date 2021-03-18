import React from 'react';
import apiCall from '~/common/api-call';
import { useSelector, useDispatch } from 'react-redux';
import { SpinningLoader } from '~/components/Loader/Loader';
import { removeItem, updateItem as storeUpdateItem } from '~/store/cart';
import Image from '~/components/Image';

import './styles/list.scss';

function List() {

    const itemsStore = useSelector(state => state.cart);
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchData() {
        setStatus('loading');

        const ids = itemsStore.reduce((acc, next) => {
            return `${acc ? acc + ',' : acc}${next._id}`;
        }, '');

        apiCall(`products?id=${ids}`)
            .then(result => {
                setStatus('success');
                setData(result.data);
            })
            .catch(err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(fetchData, []);

    function findItem(_id) { return data.find(item => item._id === _id ); }

    return (
        <div className="cart-list">
            { 
                status === 'success' ?
                itemsStore.map((item, i) => <CartItem key={i} {...findItem(item._id)} storeData={item} />) :
                <SpinningLoader/>
            }
        </div>
    );
}

function CartItem({
    storeData,
    _id,
    images,
    name,
    sku,
    variants,
    prices
}) {
    const dispatch = useDispatch();
    const [currPrice, setCurrPrice] = React.useState(0);
    const [computedPrices, setComputedPrices] = React.useState([]);

    const variant = variants?.find(({_id}) => _id === storeData.variantId);

    function updateQty(qty) {
        dispatch(storeUpdateItem({
            ...storeData, 
            qty
        }));
    }

    function handleInput(e) {    
        const {value} = e.target;
        if ( value <= variant.stock ) updateQty(value);
    }

    function handleBlur(e) { if ( e.target.value <= 0 ) updateQty(1); }

    function remove() {
        dispatch(removeItem(storeData));
    }

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

    React.useEffect(() => prices && setComputedPrices(computePrices()), [prices]);
    
    function findPrice() {
        const index = computedPrices.findIndex(({minQty, maxQty}) => (
            maxQty ? (storeData.qty >= minQty && storeData.qty < maxQty) : true
        ));
        
        setCurrPrice(index < 0 ? 0 : index);
    }

    React.useEffect(() => findPrice(), [storeData.qty]);

    return (
        <div className="cart-item">
            <Image src={variant?.images[0].path} className="cart-item_thumbnail"/>
            <h2 className="cart-item_name">{name}</h2>
            <span className="cart-item_sku">Арт: {sku}</span>
            <div className="cart-item_config">
                <div style={{'--colorData': variant?.attributes.color.code}}>{variant?.attributes.color.name}</div>
                <div>{variant?.attributes.brand.name}</div>
            </div>

            <div className="cart-item_price">
                <div className="cart-item_price_qty">
                    <input type="text" value={storeData.qty} onChange={handleInput} onBlur={handleBlur}/>
                    <button className="cart-item_price_qty_remove" onClick={remove}/>
                </div>
                <div className="cart-item_price_sum">
                    <span>{prices?.[currPrice].amount * storeData.qty}₽</span>
                </div>
            </div>
        </div>
    );
}

export default List;