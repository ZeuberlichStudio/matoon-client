import React from 'react';
import productPlaceholder from '~/assets/images/product-placeholder.jpg';

export default function Image({src, placeholder, ...rest}) {
    const url = src || placeholder || productPlaceholder;
    return <img src={url} {...rest} style={{backgroundColor: '#eef0ef'}}/>;
}