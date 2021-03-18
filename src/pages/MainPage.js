import React from 'react';
import apiCall from '~/common/api-call.js';
import Banner from '~/components/Banner/Index.js';
import Feed from '~/components/Feed/Feed.js';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';

export default function MainPage() {

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?page=main&limit=4&sort=createdAt,-1`)
            .then(res => {
                setBannerPosts(res.data);
                setBannerPostsStatus('success');
            })
            .catch(err => {
                console.error(err);
                setBannerPostsStatus('failed');
            });
    }

    React.useEffect(fetchBannerPosts, []);
    
    return (
        <main id="title-page" className="title-page">
            { 
                bannerPostsStatus === 'success' ? 
                <>
                    <Banner pageTitle="Matoon Store" posts={bannerPosts}/>
                    <Feed />
                </> : <Loader fixed={true} />
            }
        </main>
    );
}