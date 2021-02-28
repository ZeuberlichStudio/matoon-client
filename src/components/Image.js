import React from 'react';

export default function Image({src = '', alt, ...rest}) {
    return <img src={src.includes('http') ? src : process.env.CDN_URL + src} alt={alt} {...rest}/>;
}