import React from 'react';
import apiCall from '~/common/api-call';
import {useParams} from 'react-router-dom';
import Banner from '~/components/Banner';
import Catalog from '~/features/catalog/catalog';
import { SpinningLoader as Loader } from '~/components/Loader/Loader'

export default function CategoryPage() {

    const {slug} = useParams();

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [cat, setCat] = React.useState({});
    const [catStatus, setCatStatus] = React.useState('idle');
    const [bannerPostsStatus, setBannerPostsStatus] = React.useState('idle');

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

    function fetchBannerPosts() {
        setBannerPostsStatus('loading');

        apiCall(`posts?type=banner&page=cat&cats=${cat._id}`)
            .then(res => {
                setBannerPosts(res.data);
                setBannerPostsStatus('success');
            })
            .catch(err => {
                console.error(err);
                setBannerPostsStatus('failed');
            });
    }

    React.useEffect(fetchCat, [slug]);
    React.useEffect(() => cat._id && fetchBannerPosts(), [cat._id]);

    function generateAncestorsArray() {
        const ancestors = [];

        if ( cat.parent ) ancestors.push({ name: cat.parent.name, slug: cat.parent.slug });
        
        ancestors.push({ name: cat.name, slug: cat.slug });

        return ancestors;
    }

    return(
        <main>
            { 
                catStatus === 'success' && bannerPostsStatus === 'success' ? 
                <>
                    <Banner posts={bannerPosts} pageTitle={cat?.name} ancestors={generateAncestorsArray()}/>
                    <Catalog catSlug={slug ?? ''}/>
                </> : <Loader fixed={true} />
            }
        </main>
    );
}