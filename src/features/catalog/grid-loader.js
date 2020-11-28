import React from 'react';
import './styles/grid-loader.scss';

function GridLoader({ limit = 20, view }) {
    const placeholders = [];

    for ( let i = 0; i < 4; i++ ) {
        placeholders.push(<div className={`item-placeholder item-placeholder-${view}`}/>);
    }

    return placeholders;
}

export default GridLoader;