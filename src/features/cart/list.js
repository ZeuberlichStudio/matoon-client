import { forEach } from 'lodash';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SpinningLoader } from '../loader';
import withVariablePrice from '../product/withVariablePrice';
import { removeItemById as storeRemoveItem, updateItem as storeUpdateItem } from './slice';

import './styles/list/pc.scss';

const { API_URL } = process.env;
const { CDN_URL } = process.env;

function List() {

    const itemsStore = useSelector(state => state.cart.items);
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchData() {
        setStatus('loading');

        const ids = itemsStore.reduce((acc, next) => {
            return `${acc ? acc + ',' : acc}${next._id}`;
        }, '');

        function mergeStoreAndData(data) {
            return data.map( item => 
                Object.assign(item, itemsStore.find(storeItem => storeItem._id === item._id))
            )
        }

        fetch(API_URL + `products/variations?ids=${ids}`)
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error('Something went wrong');
            })
            .then(data => {
                setStatus('success');
                setData(mergeStoreAndData(data));
            })
            .catch(err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(() => fetchData(), []);

    const dispatch = useDispatch();

    function removeItem(idx) {
        const [...newData] = data;

        newData.splice(idx, 1);
        dispatch(storeRemoveItem(data[idx]._id));
        setData(newData);
    }

    return (
        <div className="cart-list">
            { 
                status === 'success' ?
                data.map(({stock, prices, qty, ...item}, i) => 
                    <CartItemWithVariablePrice
                        key={i} 
                        initQty={qty} 
                        removeItem={() => removeItem(i)}
                        {...{prices, stock, ...item}}
                    />
                ) :
                <SpinningLoader/>
            }
        </div>
    );
}

const CartItemWithVariablePrice = withVariablePrice(CartItem);

function CartItem({
    _id,
    images,
    name,
    sku,
    color,
    brand,
    price,
    qty,
    qtyFieldHandler,
    removeItem
}) {

    const dispatch = useDispatch();

    React.useEffect(() => {
        const updateObj = {
            _id,
            qty,
            price
        }

        dispatch(storeUpdateItem({_id, updateObj}));
    }, [qty, price]);

    function handleQtyBlur(e) {
        const {value} = e.target;
        if ( !value || value <= 0 ) { e.target.value = 1; qtyFieldHandler(e); }
    }

    return (
        <div className="cart-item">
            <img src={CDN_URL + images[0]} alt="" className="cart-item_thumbnail"/>
            <h2 className="cart-item_name">{name}</h2>
            <span className="cart-item_sku">Арт: {sku}</span>
            <div className="cart-item_config">
                <div style={{'--colorData': color.value}}>{color.name}</div>
                <div>{brand.name}</div>
            </div>
            <div className="cart-item_price">
                <div className="cart-item_price_qty">
                    <input type="text" value={qty} onChange={qtyFieldHandler} onBlur={handleQtyBlur}/>
                    <button className="cart-item_price_qty_remove" onClick={removeItem}/>
                </div>
                <div className="cart-item_price_sum">
                    <span>{price * qty}₽</span>
                </div>
            </div>
        </div>
    );
}

export default List;