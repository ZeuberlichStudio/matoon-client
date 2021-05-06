import React from 'react';
import Image from '~/components/Image';

import './styles/image.scss';

const { STATIC_SOURCE } = process.env;

export default function PostImage({ image, title }) {
    const imageSrc = image ? `${STATIC_SOURCE}${image}` : ''

    return (
        <div className="post-image">
            <Image src={imageSrc} alt={ title }/>
        </div>
    );
}