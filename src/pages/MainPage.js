import React from 'react';
import apiCall from '~/common/api-call.js';
import Banner from '~/components/Banner/Index.js';
import Feed from '~/components/Feed/Feed.js';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';
import { Helmet } from 'react-helmet';

const { SITE_TITLE } = process.env;

export default function MainPage() {

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?type=banner&page=main&limit=4&sort=createdAt,-1`)
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
            <Helmet>
                <title>{`${SITE_TITLE} - Главная`}</title>
            </Helmet>
            { 
                bannerPostsStatus === 'success' ? 
                <>
                    <Banner pageTitle="Matoon Store" posts={bannerPosts}/>
                    <Feed />
                </> : <Loader position="fixed" />
            }
        </main>
    );
}