import React from 'react';
import apiCall from '~/common/api-call';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {changeSearch, resetQuery, changeCategory} from '~/features/catalog/querySlice';

import Banner from '~/components/Banner/Index.js';
import Catalog from '~/features/catalog/catalog';
import {SpinningLoader as Loader} from '~/components/Loader/Loader'

export default function CategoryPage() {
    const dispatch = useDispatch();
    const {search, slug} = useParams();
    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');
    const [cat, setCat] = React.useState({});
    const [catStatus, setCatStatus] = React.useState('idle');

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?type=banner&page=search&limit=4&sort=createdAt,-1`)
            .then(res => {
                setBannerPosts(res.data);
                setBannerPostsStatus('success');
            })
            .catch(err => {
                console.error(err);
                setBannerPostsStatus('failed');
            });
    }

    function fetchCat() {
        setCatStatus('loading');

        apiCall(`cats/${slug}?isSlug=true`)
            .then(res => {
                setCat(res.data);
                console.log(res.data)
                setCatStatus('success');
            })
            .catch(err => {
                console.error(err);
                setCatStatus('failed');
            });
    }

    React.useEffect(fetchBannerPosts, []);
    React.useEffect(() => {
        if ( slug ) fetchCat();
        else setCatStatus('success');
    }, [slug]);
    React.useEffect(() => { dispatch(changeSearch(search)) }, [search]);
    React.useEffect(() => { slug && dispatch(changeCategory(slug)) }, [slug]);

    return(
        <main>
            { 
                catStatus === 'success' && bannerPostsStatus === 'success' ? 
                <>
                    <Banner 
                        posts={bannerPosts} 
                        pageTitle={slug ? `${cat.name} - поиск` : 'Поиск'} 
                    />
                    <Catalog/>
                </> : <Loader fixed={true} />
            }
        </main>
    );
}