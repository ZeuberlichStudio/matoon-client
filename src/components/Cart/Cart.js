import React from 'react';
import apiCall from '~/common/api-call';
import Stage from './Stage';
import Empty from './Emty';
import ItemList from './ItemList';
import Customer from './Customer';
import Shipping from './Shipping';
import Payment from './Payment';
import Ticket from './Ticket';
import { useDispatch, useSelector } from 'react-redux';
import { selectCustomerStepCompletion, selectShippingStepCompletion, selectPaymentStepCompletion, selectFormData } from '~/store/order-form';
import { selectItems, resetCart } from '~/store/cart';
import { selectTarget } from '~/app/device';

import './styles/cart.scss';

function Cart({ closeButton }, ref) {
    const dispatch = useDispatch(),
          formData = useSelector(selectFormData),
          items = useSelector(selectItems),
          [postStatus, setPostStatus] = React.useState('idle'),
          [orderId, setOrderId] = React.useState(null),
  
          target = useSelector(selectTarget),
          [currStep, setCurrStep] = React.useState(0),
        
          steps = [
              {
                  title: 'Ваш заказ',
                  component: items.length > 0 ? <ItemList/> : <Empty/>,
                  complete: items.length > 0,
                  footer: items.length > 0
              },
              {
                  title: 'Расскажите о себе',
                  component: <Customer />,
                  complete: useSelector(selectCustomerStepCompletion)
              },
              {
                  title: 'Доставка',
                  component: <Shipping />,
                  complete: useSelector(selectShippingStepCompletion)
              },
              {
                  title: 'Оплата',
                  component: <Payment />,
                  complete: useSelector(selectPaymentStepCompletion)
              },
              {
                  title: 'Заказ оформлен',
                  component: <Ticket orderId={orderId}/>
              }
          ]

    function goForward() {
        setCurrStep(currStep + 1);
    }

    function goBack() {
        setCurrStep(currStep - 1);
    }

    function submit() {
        const body = {
            ...formData,
            items
        };

        setPostStatus('loading');

        apiCall.post('/orders', body)
            .then(result => {
                setOrderId(result.data);
                setPostStatus('success');
            })
            .catch(err => {
                console.error(err);
                setPostStatus('failed');
            });
    }
    
    function reset() {
        dispatch(resetCart());
    }

    React.useEffect(() => {
        postStatus === 'loading' && setCurrStep(steps.length - 1);
        return postStatus === 'success' && reset;
    }, [postStatus]);

    const stepProps = {
        goBack,
        goForward,
        submit,
        closeButton,
        totalSteps: steps.length
    }

    return (
        <div ref={ref} id="cart" className="cart" style={{'--step': currStep}}>
            { 
                target === 'mobile' ? 
                steps.map((step, index) => <Stage key={index} {...step} {...{ index, ...stepProps }}/>) :
                <Stage {...steps[currStep]} {...{ index: currStep, ...stepProps }}/> 
            }
        </div>
    );
}

export default React.forwardRef(Cart); 