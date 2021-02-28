import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './styles/post.scss';

export default function BannerPostText({
    post: {
        name,
        content,
        slug,
    } = {},
    i
}) {
    const backgroundLocation = useLocation();

    const postLink = {
        pathname: `/feed/post=${ slug }`,
        state: { backgroundLocation }
    }

    return (
        <div className={`banner-post banner-post-${ i }`}>
            <h3>{name}</h3>
            <p>{content}</p>

            <Link to={postLink}>
                <span>Подробнее</span>
            </Link>
        </div>
    );
}