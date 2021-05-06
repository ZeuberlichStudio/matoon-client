import React from 'react';
import './loader.scss';

const getPositionStyle = (position) => ({
    position,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
});

const SpinningLoader = ({position}) => (
    <div 
        className="loader-container"
        style={ position ? getPositionStyle(position) : null }
    >
        <div className="spinning-loader">
        </div>
    </div>
);

function withLoader(jsx, Loader, status) {
    return status !== 'success' ? <Loader/> : jsx
};

export {SpinningLoader, withLoader};