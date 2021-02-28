import React from 'react';
import './styles/index/pc.scss';
import { useDispatch, useSelector } from 'react-redux';

import { 
    selectItems,
    selectCustomerInfo, 
    selectContactMethod, 
    selectShippingMethod,
    selectPaymentMethod,
    clearOrderInfo 
} from './slice';

import Slider from '~/features/slider/slider';
import Scrollable from '~/features/scrollable';
import { SpinningLoader as Loader} from '~/features/loader';

import Header from './header';
import Controls from './controls';
import Empty from './empty';
import List from './list';
import Contact from './contact';
import Delivery from './delivery';
import Payment from './payment';
import Ticket from './ticket';

function Cart({ closeButton }, ref) {

    const [currBlock, setCurrBlock] = React.useState(0);

    function goBack() { setCurrBlock(currBlock - 1); }
    function goForward() { setCurrBlock(currBlock + 1); }

    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const customerInfo = useSelector(selectCustomerInfo);
    const contactMethod = useSelector(selectContactMethod);
    const shippingMethod = useSelector(selectShippingMethod);
    const paymentMethod = useSelector(selectPaymentMethod);

    React.useEffect(() => () => { dispatch(clearOrderInfo()) }, []);

    const order = useSelector(state => state.cart);
    const [postStatus, setPostStatus] = React.useState('idle');
    const [orderId, setOrderId] = React.useState('1234');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * Math.floor(max - min) + min);
    }

    function imitateOrderPlacing() {
        setPostStatus('loading');

        setTimeout(function() {
            setPostStatus('success');
            setOrderId(getRandomInt(1000, 2000));
        }, 1200);
    }

    function placeOrder() {
        setPostStatus('loading');
        // console.log(JSON.stringify(order));

        fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                setPostStatus('success');
                setOrderId(data.publicId);
            })
            .catch(err => {
                setPostStatus('failed');
                console.log(err);
            });
    }

    const blocks = [
        {
            component: List,
            valid: items.length > 0,
            button: {
                text: 'Далее',
                callback: goForward
            }
        },
        {
            component: Contact,
            valid: customerInfo.valid && contactMethod.valid,
            button: {
                text: 'Далее',
                callback: goForward
            }
        },
        {
            component: Delivery,
            valid: shippingMethod.valid,
            button: {
                text: 'Далее',
                callback: goForward
            }
        },
        {
            component: Payment,
            valid: paymentMethod.valid,
            button: {
                text: 'Оформить',
                callback: imitateOrderPlacing
            }
        }
    ];

    return (
        <div ref={ref} id="cart" className={`cart ${items.length == 0 ? 'empty' : ''}`}>
            <div className="cart-wrapper">
                {
                    postStatus == 'idle' ?
                    (
                        items.length > 0 ? 
                        <Slider 
                            slide={currBlock} 
                            loop={false}
                            controls={false}
                        >
                            { 
                                blocks.map((block, index) => 
                                    <CartBlock 
                                        key={index}
                                        {...block}
                                        index={index}
                                        goBack={goBack}
                                        closeButton={closeButton}
                                    />
                                ) 
                            }
                        </Slider> :
                        <Empty {...{closeButton}}/>
                    ) : 
                    <CartBlock 
                        component={
                            () => (
                                postStatus == 'success' && orderId ?  
                                <Ticket orderId={orderId}/> : <Loader/>
                            )
                        } 
                        closeButton={closeButton}
                        controls={false}
                    />
                }
            </div>
        </div>
    );
}

function CartBlock({ 
    component: Component, 
    valid,
    index,
    button,
    goBack,
    closeButton,
    controls = true,
    showTotal
}) {

    const [isValid, setIsValid] = React.useState(false);

    React.useEffect(() => setIsValid(valid), [valid]);

    return (
        <div className="cart-block">
            <Header {...{goBack: index > 0 && goBack, closeButton}}/>
            <div className="cart-block_content">
                <Scrollable>
                    <Component/>
                </Scrollable>
            </div>
            { controls && <Controls {...{button, isValid, showTotal}}/> }
        </div>
    );
}

export default React.forwardRef(Cart);