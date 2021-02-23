import React, { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { PostHeader, PostContent, PostImage } from 'features/post';

import './index.scss';

const { API_URL } = process.env;

export function PostPage({ closeButton }, ref) {

    const { slug: slugParam } = useParams();

    const [post, setPost] = React.useState({});
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if ( status === 'idle' ) {
            fetch(`${ API_URL }feed/slug=${ slugParam }`)
                .then( data => data.json() )
                .then( data => {
                    setPost( data[0] );
                    setStatus('succeeded');
                })
                .catch( err => setError( err ) );
        }
    }, []);
    
    const {
        title,
        slug,
        image,
        content,
        type,
        link,
        promo
    } = post;

    return (
        <main ref={ ref } id="post-page" className="post-page">
            <div className="post-page_post-wrapper">
                <div className="post-page_post">
                    <PostImage {...{ image, title }}/>
                    <PostHeader {...{ title, slug, closeButton }}/>
                    <PostContent {...{ image, content, type, link, promo }}/>
                </div>
            </div>
        </main>
    );
}

export default forwardRef(PostPage);