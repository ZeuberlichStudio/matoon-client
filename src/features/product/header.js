import React from 'react';
import './styles/header.scss';

export default function Productheader({ name, slug, closeButton }) {
    return (
        <div className="product-header">
            <h1 className="product-header_title">{ name }</h1>

            <div className="product-header_share">
                <a className="product-header_share_vk" href="/vk"></a>
                <a className="product-header_share_fb" href="/fb"></a>
                <button className="product-header_share_fav" onClick={ () => alert('add to favourite') }/>
            </div>

            { closeButton && closeButton }
        </div>
    );
}