import React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';
import Banner from 'features/banner';
import Catalog from 'features/catalog/catalog';
import { useDispatch } from 'react-redux';
import { setSearch } from 'features/catalog/querySlice';

const { API_URL } = process.env;
const tempApiEndpoint = 'categories/обложки-на-документы';

export default function SearchPage() {

    const params = useParams();

    const [bannerPosts, setBannerPosts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    function fetchBannerPosts() {
        setStatus('loading');

        fetch(API_URL + tempApiEndpoint)
            .then( data =>  data.json() )
            .then( cat => {
                setBannerPosts(cat[0].posts);
                setStatus('succeeded');
            })
            .catch( err => {
                setStatus('failed');
                setError(err);
            });
    }

    React.useEffect(() => {
        fetchBannerPosts();
    }, []);

    React.useEffect(() => { setStatus('idle') }, [params])

    const bannerData = {
        pageTitle: 'Поиск',
        searchString: decodeURI(params.search),
        bannerPosts
    };

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setSearch(params.search));
        console.log(params.search);
        return () => {
            dispatch(setSearch(null));
            console.log('fired');
        }
    }, [params.search]);

    return(
        <>
            <main>
                <Banner {...bannerData}/>
                <Catalog catSlug={ params.slug } {...{ search: params.search }}/>
            </main>
        </>
    );
}