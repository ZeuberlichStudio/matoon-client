import React from 'react';
import apiCall from '~/common/api-call';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { changeCategory, resetQuery } from '~/features/catalog/querySlice';

import Banner from '~/components/Banner/Index.js';
import Catalog from '~/features/catalog/catalog';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';

export default function CategoryPage() {

    const {slug} = useParams();
    const dispatch = useDispatch();
    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');
    const [cat, setCat] = React.useState({});
    const [catStatus, setCatStatus] = React.useState('idle');
    
    function fetchCat() {
        setCatStatus('loading');

        apiCall(`cats/${slug}?isSlug=true`)
            .then(res => {
                setCat(res.data);
                setCatStatus('success');
            })
            .catch(err => {
                console.error(err);
                setCatStatus('failed');
            });
    }

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?type=banner&page=${cat._id}&limit=4&sort=createdAt,-1`)
            .then(res => {
                setBannerPosts(res.data);
                setBannerPostsStatus('success');
            })
            .catch(err => {
                console.error(err);
                setBannerPostsStatus('failed');
            });
    }

    function generateAncestorsArray() {
        const ancestors = [];

        if ( cat.parent ) ancestors.push({ name: cat.parent.name, slug: cat.parent.slug });
        
        ancestors.push({ name: cat.name, slug: cat.slug });

        return ancestors;
    }

    React.useEffect(fetchCat, [slug]);
    React.useEffect(() => {
        dispatch(resetQuery());
        dispatch(changeCategory(slug));

        return () => dispatch(resetQuery());
    }, [slug]);
    React.useEffect(() => cat._id && fetchBannerPosts(), [cat._id]);

    return(
        <main>
            { 
                catStatus === 'success' && bannerPostsStatus === 'success' ? 
                <>
                    <Banner 
                        posts={bannerPosts} 
                        pageTitle={cat?.name} 
                        ancestors={generateAncestorsArray()} 
                        catSlug={slug}
                    />
                    <Catalog catSlug={slug ?? ''}/>
                </> : <Loader fixed={true} />
            }
        </main>
    );
}