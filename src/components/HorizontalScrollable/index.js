import React from 'react';
import './styles.scss';

export default function HorizontalScrollable({ children, className }) {
    return (
        <div className={`horizontal_scrollable ${className}_wrapper`}>
            <div className={`horizontal_scrollable--content ${className}`}>{children}</div>
        </div>
    )
}