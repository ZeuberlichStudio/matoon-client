import React from 'react';
import Image from '~/components/Image.js';

import './styles/preview.scss';

export default function BannerPostsPreview({ 
    posts, 
    active, 
    changePost 
}) {
    return (
        <div className="banner-posts-preview">
            { 
                posts.map(({ image, title }, i) => 
                    <button className={i === active ? 'active' : ''} onClick={() => changePost(i) } key={i}>
                        <Image src={image.path} alt={title}/>
                    </button>
                ) 
            }
        </div>
    );
}