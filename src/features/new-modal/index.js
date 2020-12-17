import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { toggleHeaderLayer } from 'app/ui';

import './index.scss';

export function Modal({ 
    children: child, 
    closeCallback, 
    navFocus,
    animation,
    transitionLength = 200, 
    // hide,
    ...props 
}, ref) {
    const [visible, setVisible] = React.useState(false);

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const contentRef = React.useRef();

    function close() {    
        setVisible(false);
        document.body.style.overflowY = '';
        document.body.ariaHidden = '';
        setTimeout(() => {
            const { state } = location;

            if ( navFocus ) dispatch(toggleHeaderLayer(false));
            
            if ( closeCallback ) closeCallback();
            else if ( state && state.backgroundLocation ) {
                history.push( state.backgroundLocation );
            }
        }, transitionLength);
    };

    function outerClickHandler(e) {
        if ( !contentRef.current ) console.log('content ref is not defined!');
        else {
            const closest = e.target.closest(`#${contentRef.current.id}`);
            ( !closest || closest === e.target ) && close();
        }
    }

    function init() {
        console.log('fired init function');

        if ( !visible ) {
            setVisible(true);
            if ( navFocus ) dispatch(toggleHeaderLayer(true));
            document.body.style.overflowY = 'hidden';
            document.body.ariaHidden = 'true';
        }        
    }

    React.useEffect( () => {
        ref.current.addEventListener('click', outerClickHandler);
        return () => { ref.current.removeEventListener('click', outerClickHandler) };
    }, [closeCallback]);

    React.useEffect(init, []);

    const containerAnimation = {
        initial: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        final: {
            backgroundColor: null
        }
    };


    const contentAnimation = {
        scale: {
            initial: {
                transform: 'scale(0)'
            },
            final: {
                transform: 'scale(1)'
            }
        },
        slideFromLeft: {
            initial: {
                transform: 'translate(-100%)'
            },
            final: {
                transform: 'translate(0)'
            }
        },
        slideFromRight: {
            initial: {
                transform: 'translate(100%)'
            },
            final: {
                transform: 'translate(0)'
            }
        }
    };

    //tring to add trigger for hide animation on prop change
    // const [animating, setAnimating] = React.useState(true);
    
    // const contentStyle = (
    //     hide ?
    //     contentAnimation[animation || 'scale']['initial'] :
    //     contentAnimation[animation || 'scale'][visible ? 'final' : 'initial']
    // )

    // React.useEffect(() => {
    //     setAnimating(!hide);
    // }, [animation]);

    // React.useEffect(() => {
    //     if ( hide ) return;
    //     setAnimating(true);
    // }, [hide]);

    return createPortal (
        <div ref={ ref } style={ containerAnimation[visible ? 'final' : 'initial'] } id="modal">
            <div style={ contentAnimation[animation || 'scale'][visible ? 'final' : 'initial'] } id="modal-content">
                { 
                    React.cloneElement( child, { 
                        ref: contentRef, 
                        closeModal: close, 
                        closeButton: <CloseButton {...{close}}/> 
                    }) 
                }
            </div>
        </div>,
        document.body
    );
}

function CloseButton({ close }) {
    return (
        <button onClick={ close } id="modal-close">
            <span></span>
        </button>
    );
}

export default React.forwardRef(Modal);