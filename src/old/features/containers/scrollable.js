import React from 'react';

import './styles/scrollable.scss';

export default function ScrollableContainer({ children }) {
    return (
        <div className="scrollable-wrapper">
            <div className="scrollable-container">
                { children }
            </div>
        </div>
    );
}