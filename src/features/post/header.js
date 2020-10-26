import React from 'react';
import './styles/header.scss';

export default function PostHeader({ title, slug, closeButton }) {
    return (
        <div className="post-header">
            <h1 className="post-header_title">{ title }</h1>

            <div className="post-header_share">
                <a className="post-header_share_vk" href="/vk"></a>
                <a className="post-header_share_fb" href="/fb"></a>
            </div>

            { closeButton && closeButton }
        </div>
    );
}