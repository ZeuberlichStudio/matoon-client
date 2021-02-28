import React from 'react';
import Image from '~/components/Image';

import './styles/image.scss';

const { API_URL } = process.env;

export default function PostImage({ image, title }) {

    return (
        <div className="post-image">
            <Image src={image} alt={ title }/>
        </div>
    );
}