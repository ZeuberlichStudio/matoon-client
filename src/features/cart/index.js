import React from 'react';
import './styles/index/pc.scss';

import Button from 'features/button';
import Slider from 'features/slider/slider';
import List from './list';
import Customer from './customer';
import Delivery from './delivery';
import Payment from './payment';
import { useSelector } from 'react-redux';
import { forEach } from 'lodash';

function Cart({ closeButton }, ref) {

    const cartStore = useSelector(state => state.cart); 

    const [currBlock, setCurrBlock] = React.useState(0);

    function goBack() {
        setCurrBlock(currBlock - 1);
    }

    function goForward() {
        setCurrBlock(currBlock + 1);
    }

    const blocks = [
        {
            component: <List/>,
        },
        {
            component: <Customer/>,
            validation: () => {
                const customerData = {...cartStore.customer, ...cartStore.contactBy};

                for ( const [k, v] of Object.entries(customerData) ) {
                    if ( !v ) return false;
                }

                return true;
            }
        },
        {
            component: <Delivery/>,
            validation: () => {
                const { option, details } = cartStore.shipping;
                if ( option && details ) return true;
            }
        },
        {
            component: <Payment/>
        }
    ];

    return (
        <div ref={ref} id="cart" className="cart">
            { console.log(currBlock) }
            <div className="cart-wrapper">
                <Slider slide={currBlock} loop={false}>
                    { 
                        blocks.map(({ component, validation }) => (
                            <CartBlock {...{goForward, goBack, validation}}>
                                {component}
                            </CartBlock>
                        )) 
                    }
                </Slider>
            </div>
        </div>
    );
}

function CartBlock({ children, goForward, goBack, validation }) {
    return (
        <div className="cart-block">
            <CartHeader {...{goBack}}/>
            <div className="cart-block_content">
                { children }
            </div>
            <CartControls {...{goForward, validation}}/>
        </div>
    );
}

function CartHeader({ title, goBack, closeButton }) {
    return (
        <div className="cart-header">
            <Button className="cart-header_back" onClick={goBack}/>
            <span>{title || 'Корзина'}</span>
            { closeButton }
        </div>
    );
}

function CartControls({ goForward, validation }) {

    const storeItems = useSelector(state => state.cart.items);

    function showTotal() {
        let total = 0;
        storeItems.forEach(({price, qty}) => total = total + price * qty);
        return total;
    }

    function forwardButtonHandler() {
        if ( validation ) validation() && goForward();
        else goForward();
    }

    return (
        <div className="cart-controls">
            <ul className="cart-controls_cost">
                <li>
                    <span>Общая стоимость</span>
                    <hr/>
                    <span>{showTotal()}₽</span>
                </li>
            </ul>

            <Button text={'Далее'} className="cart-controls_next" onClick={forwardButtonHandler}/>
        </div>
    );
}

export default React.forwardRef(Cart);