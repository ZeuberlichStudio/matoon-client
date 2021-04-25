import React from 'react';
import productPlaceholder from '~/assets/images/product-placeholder.jpg';

export default function Image({src, placeholder, ...rest}) {
    return <img src={src || productPlaceholder} {...rest}/>;
}