import React from 'react';
import { useTransition, animated } from 'react-spring';

import './modal.scss';

export function Modal({children, title, closeCallback}) {

    const [initialized, setInitialized] = React.useState(true);

    React.useEffect(() => {
        initModal();
    }, []);

    function initModal() {
        document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
        document.body.style.overflowY = 'hidden';
    }

    function close() {
        setInitialized(false);
        document.body.style.overflowY = '';
        setTimeout(closeCallback, 600);
    }

    const wrapperAnimation = {
        animation: initialized ? 'fadeIn 0.3s forwards' : 'fadeOut 0.4s forwards'
    }

    const containerAnimation = {
        animation: initialized ? 'slideIn 0.3s forwards' : 'slideOut 0.4s forwards'
    }

    return (
        <div id="modal-wrapper" className="modal-wrapper" style={wrapperAnimation}>
            <div id="modal-container" className="modal-container" style={containerAnimation}>
                <div className="modal-header">
                    <h2>{ title }</h2>
                    <button onClick={close} id="modal-close" className="modal-close"><span></span></button>
                </div>
                <div className="modal-content">
                    { children }
                </div>
            </div>
        </div>
    );
}