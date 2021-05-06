import React from 'react';
import apiCall from '~/common/api-call';
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {changeSearch, resetQuery, changeCategory} from '~/features/catalog/querySlice';
import useQuery from '~/common/useQuery';

import Banner from '~/components/Banner/Index.js';
import Catalog from '~/features/catalog/catalog';
import {SpinningLoader as Loader} from '~/components/Loader/Loader'
import { Helmet } from 'react-helmet';

const { SITE_TITLE } = process.env;

export default function CategoryPage() {
    const dispatch = useDispatch();
    const { search } = useParams();
    const query = useQuery();
    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [cat, setCat] = React.useState({});
    const [catStatus, setCatStatus] = React.useState('idle');
    // const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');

    // function fetchBannerPosts() {
    //     setBannerPostsStatus('loading');

    //     apiCall(`posts?type=banner&page=search&limit=4&sort=createdAt,-1`)
    //         .then(res => {
    //             setBannerPosts(res.data);
    //             setBannerPostsStatus('success');
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             setBannerPostsStatus('failed');
    //         });
    // }

    // React.useEffect(fetchBannerPosts, []);

    function fetchCat() {
        setCatStatus('loading');

        const catSlug = query.get('catSlug');

        apiCall(`cats/${catSlug}?isSlug=true`)
            .then(res => {
                setCat(res.data);
                setCatStatus('success');
            })
            .catch(err => {
                console.error(err);
                setCatStatus('failed');
            });
    }

    React.useEffect(() => {
        const catSlug = query.get('catSlug');

        if ( catSlug ) {
            fetchCat();
            dispatch(changeCategory(catSlug))
        }
        else setCatStatus('success');

        //reset search on page change
        return function() { dispatch(resetQuery()); }
    }, []);

    React.useEffect(() => { dispatch(changeSearch(search)) }, [search]);

    return(
        <main>
            <Helmet>
                <title>{`${SITE_TITLE} - Поиск`}</title>
            </Helmet>
            { 
                catStatus === 'success' /* && bannerPostsStatus === 'success' */ ? 
                <>
                    <Banner 
                        posts={bannerPosts} 
                        pageTitle={cat.name ? `${cat.name} - поиск` : 'Поиск'} 
                    />
                    <Catalog/>
                </> : <Loader position="fixed" />
            }
        </main>
    );
}