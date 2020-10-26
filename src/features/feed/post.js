import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/post.scss';

const { API_URL } = process.env;

export default function FeedPost({ i, slug, image, title, shortDescription, size }) {

    const backgroundLocation = useLocation();

    const postLink = {
        pathname: `/feed/post=${ slug }`,
        state: { backgroundLocation }
    }

    return (
        <div className={`feed-post feed-post-${i} ${ size }`}>
            <img src={ API_URL + image } alt={ title } className="feed-post_image"/>

            <div className="feed-post_content">
                <h2>{ title }</h2>
                <p>{ shortDescription }</p>
            </div>

            <Link to={ postLink }>
                <span>Подробнее</span>
            </Link>
        </div>
    );
}