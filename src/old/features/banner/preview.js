import React from 'react';
import './styles/preview.scss';

const { API_URL } = process.env;

function BannerPostsPreview({ changePost, posts, active }) {

    return (
        <div className="banner-posts-preview">
            { 
                posts.map(({ image, title }, i) => 
                    <button className={ i === active ? 'active' : '' } onClick={ () => changePost(i) } key={ i }>
                        <img src={ API_URL + image } alt={ title }/>
                    </button>
                ) 
            }
        </div>
    );
}

export default BannerPostsPreview;