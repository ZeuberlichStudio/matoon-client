import React from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom';

import './index.scss';

export default function Modal({ children: child, closeCallback }) {
    
    const location = useLocation();
    const history = useHistory();
    const modalRef = React.useRef();

    const [visible, setVisible] = React.useState(false);

    function closeModal() {
        if ( closeCallback ) return closeCallback();
        
        setVisible(false);

        setTimeout(() => {
            const { backgroundLocation } = location.state && location.state;
            history.push( backgroundLocation );
        }, 200);
    }

    React.useEffect(() => setVisible(true), []);

    const containerStyles = {
        initial: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        final: {
            backgroundColor: null
        }
    };

    const contentStyles = {
        initial: {
            transform: 'scale(0)'
        },
        final: {
            transform: 'scale(1)'
        }
    };

    return createPortal (
        <div ref={ modalRef } style={ containerStyles[visible ? 'final' : 'initial'] } id="modal">
            <div style={ contentStyles[visible ? 'final' : 'initial'] } id="modal-content">
                { React.cloneElement( child, { closeButton: <ModalClose {...{closeModal}}/>, modalRef } ) }
            </div>
        </div>,
        document.body
    );
}

function ModalClose({ closeModal }) {
    return (
        <button onClick={ closeModal } id="modal-close">
            <span></span>
        </button>
    );
}