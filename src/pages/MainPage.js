import React from 'react';
import apiCall from '~/common/api-call.js';
import Banner from '~/components/Banner/Index.js';
import Feed from '~/components/Feed/Feed.js';

export default function MainPage() {

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchBannerPosts() {
        apiCall('posts?type=banner&page=main')
            .then(res => {
                setBannerPosts(res.data);
                setStatus('success');
            })
            .catch(err => {
                console.error(err);
                setStatus('failed');
            });
    }

    React.useEffect(fetchBannerPosts, []);
    
    return (
        <main id="title-page" className="title-page">
            <Banner posts={bannerPosts}/>
            <Feed />
        </main>
    );
}