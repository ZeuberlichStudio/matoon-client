import React from 'react';
import Image from '~/components/Image.js';

import './styles/preview.scss';

const {STATIC_SOURCE} = process.env;

export default function BannerPostsPreview({ 
    posts, 
    active, 
    changePost 
}) {

    const getImageSrc = (path) => path ? `${STATIC_SOURCE}${path}` : '';

    return (
        <div className="banner-posts-preview">
            { 
                posts.map(({ image, title }, i) => 
                    <button className={i === active ? 'active' : ''} onClick={() => changePost(i) } key={i}>
                        <Image src={getImageSrc(image?.path)} alt={title}/>
                    </button>
                ) 
            }
        </div>
    );
}