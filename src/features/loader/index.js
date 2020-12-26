import React from 'react';
import './index.scss';

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

export {SpinningLoader};