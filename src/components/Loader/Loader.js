import React from 'react';
import './loader.scss';

const SpinningLoader = ({fixed}) => (
    <div 
        className="loader-container"
        style={{
            position: fixed ? 'fixed' : null
        }}
    >
        <div className="spinning-loader">
        </div>
    </div>
);

function withLoader(jsx, Loader, status) {
    return status !== 'success' ? <Loader/> : jsx
};

export {SpinningLoader, withLoader};