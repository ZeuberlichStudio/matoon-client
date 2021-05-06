import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from '~/components/Image.js';

import './styles/post.scss';

const {STATIC_SOURCE} = process.env;

export default function FeedPost({
    i,
    slug,
    size,
    name,
    content,
    image
}) {

    const backgroundLocation = useLocation();
    const imageSrc = image ? `${STATIC_SOURCE}${image}` : ''
    const postLink = {
        pathname: `/feed/post=${ slug }`,
        state: { backgroundLocation }
    }

    return (
        <div className={`feed-post feed-post-${size} feed-post-${i}`}>
            <Image src={imageSrc} alt={name} className="feed-post_image" />

            <div className="feed-post_content">
                <h2>{name}</h2>
                { content && <p>{content}</p> }
            </div>

            <Link to={postLink}>
                <span>Подробнее</span>
            </Link>
        </div>
    );
}