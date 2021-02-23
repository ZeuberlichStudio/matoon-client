import React from 'react';
import './styles/header.scss';
import ProductShare from './share';

export default function Productheader({ name, slug, id, closeButton }) {
    return (
        <div className="product-header">
            <h1 className="product-header_title">{ name }</h1>
            <ProductShare {...{ id, slug }}/>
            { closeButton && closeButton }
        </div>
    );
}