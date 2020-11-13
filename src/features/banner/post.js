import React from 'react';
import { Link } from 'react-router-dom';
import './styles/post.scss';

function BunnerPost({ data, i }) {

    const {
        title,
        content,
        link
    } = data;

    return (
        <div className={`banner-post banner-post-${ i }`}>
            <h3>{ title }</h3>
            <p>{ content }</p>

            <Link>
                <span>Подробнее</span>
            </Link>
        </div>
    );
}

export default BunnerPost;