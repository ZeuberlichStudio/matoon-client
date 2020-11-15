import React from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom';

import './index.scss';

export function Modal({ 
    children: child, 
    closeCallback, 
    navFocus,
    transitionLength = 200, 
    ...props 
}, ref) {
    const [visible, setVisible] = React.useState(false);

    const location = useLocation();
    const history = useHistory();
    const contentRef = React.useRef();

    function outerClickHandler(e) {
        if ( !contentRef.current ) console.log('content ref is not defined!');
        else {
            const closest = e.target.closest(`#${contentRef.current.id}`);
            ( !closest || closest === e.target ) && close();
        }
    }

    function init() {
        setVisible(true);
        ref.current.addEventListener('click', outerClickHandler);
        document.body.style.overflowY = 'hidden';
        document.body.ariaHidden = 'true';
    }

    function close() {        
        setVisible(false);
        setTimeout(() => {
            const { state } = location;

            if ( closeCallback ) closeCallback();
            else if ( state && state.backgroundLocation ) {
                history.push( state.backgroundLocation );
            }
        }, transitionLength);
        ref.current.removeEventListener('click', outerClickHandler);
        document.body.style.overflowY = '';
        document.body.ariaHidden = '';
    };

    React.useEffect(() => { init(); }, []);

    const containerStyles = props.containerStyles || {
        initial: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        final: {
            backgroundColor: null
        }
    };


    const contentStyles = props.contentStyles || {
        initial: {
            transform: 'scale(0)'
        },
        final: {
            transform: 'scale(1)'
        }
    };

    return createPortal (
        <div ref={ ref } style={ containerStyles[visible ? 'final' : 'initial'] } id="modal">
            <div style={ contentStyles[visible ? 'final' : 'initial'] } id="modal-content">
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