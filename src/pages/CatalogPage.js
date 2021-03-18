import React from 'react';
import apiCall from '~/common/api-call';
import {useParams} from 'react-router-dom';
import Banner from '~/components/Banner';
import Catalog from '~/features/catalog/catalog';
import { SpinningLoader as Loader } from '~/components/Loader/Loader'

export default function CategoryPage() {

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?type=banner&limit=4&sort=createdAt,-1`)
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

    return(
        <main>
            { 
                bannerPostsStatus === 'success' ? 
                <>
                    <Banner 
                        posts={bannerPosts} 
                        pageTitle={'Каталог'} 
                    />
                    <Catalog/>
                </> : <Loader fixed={true} />
            }
        </main>
    );
}