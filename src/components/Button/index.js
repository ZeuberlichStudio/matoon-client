import React from 'react';
import './styles.scss';

export default function Button({ 
    text, 
    onClick,
    className,
    options: {
        size = 'big',
        active = false,
        colorSchema = 'light'
    } = {}
}) {

    return (
        <button 
            onClick={onClick}
            className={`button ${active ? 'active' : ''} ${size} ${colorSchema} ${className}`}
        >
            { text }
        </button>
    );
}