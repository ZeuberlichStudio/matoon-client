import React, { forwardRef } from 'react';
import apiCall from '~/common/api-call.js';
import { useParams } from 'react-router-dom';
import { PostHeader, PostContent, PostImage } from '~/features/post';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';

import './index.scss';

export function PostPage({ closeButton }, ref) {
    const {slug} = useParams();
    const [post, setPost] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    function fetchPost() {
        setStatus('pending');

        apiCall(`posts/${slug}?isSlug=true`)
            .then(res => {
                if ( res.data == null ) {
                    history.push('/404');
                } else {
                    setStatus('success');
                    setPost(res.data);
                }
            })
            .catch(console.error);
    }

    React.useEffect(fetchPost, []);
    
    const {
        name,
        image,
        content,
        type,
        link,
        promo
    } = post;

    return (
        <main ref={ ref } id="post-page" className="post-page">
            {
                status === 'success' ?
                <div className="post-page_post-wrapper">
                    <div className="post-page_post">
                        <PostImage {...{ image: image?.path, title: name }}/>
                        <PostHeader {...{ title: name, slug, closeButton }}/>
                        <PostContent {...{ image, content, type, link, promo }}/>
                    </div>
                </div> : <Loader/>
            }
        </main>
    );
}

export default forwardRef(PostPage);