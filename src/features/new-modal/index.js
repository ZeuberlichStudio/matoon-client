import React from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom';

import './index.scss';

export function Modal({ children: child, closeCallback, ...props }, ref) {
    
    const location = useLocation();
    const contentRef = React.useRef();

    const history = useHistory();
    const [visible, setVisible] = React.useState(false);

    function close() {        
        setVisible(false);

        setTimeout(() => {
            if ( closeCallback ) {
                closeCallback();
            } else {
                const { backgroundLocation } = location.state && location.state;
                history.push( backgroundLocation );
            }
        }, 200);
    }

    React.useEffect(() => {
        setVisible(true);

        function outerClickHandler(e) {
            if ( !contentRef.current ) return console.log('content ref is not defined!');

            const closest = e.target.closest(`#${contentRef.current.id}`);
            if ( !closest || closest === e.target ) close();
        }

        ref.current.addEventListener('click', outerClickHandler);

        return function cleanUp() {
            ref.current.removeEventListener('click', outerClickHandler);
        };
    }, []);

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

    React.useEffect(() => {
        visible && close();
    }, [location]);

    return createPortal (
        <div ref={ ref } style={ containerStyles[visible ? 'final' : 'initial'] } id="modal">
            <div style={ contentStyles[visible ? 'final' : 'initial'] } id="modal-content">
                { React.cloneElement( child, { ref: contentRef, closeModal: close, closeButton: <CloseButton {...{ closeModal: close }}/> } ) }
            </div>
        </div>,
        document.body
    );
}

function CloseButton({ closeModal }) {
    return (
        <button onClick={ closeModal } id="modal-close">
            <span></span>
        </button>
    );
}

export default React.forwardRef(Modal);