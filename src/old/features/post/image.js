import React from 'react';

import './styles/image.scss';

const { API_URL } = process.env;

export default function PostImage({ image, title }) {

    return (
        <div className="post-image">
            <img src={ API_URL + image } alt={ title }/>
        </div>
    );
}