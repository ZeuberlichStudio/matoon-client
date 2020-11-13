import React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';
import NotFoundPage from 'pages/404';
import Banner from 'features/banner';
import Catalog from 'features/catalog/catalog';

const { API_URL } = process.env;

export default function CategoryPage() {

    const params = useParams();

    const [cat, setCat] = React.useState({});
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if ( status === 'idle' ) {
            setStatus('loading');

            fetch(`${API_URL}categories/${ params.slug }`)
            .then( data => data.json())
            .then( cat => {
                setCat(cat[0]);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
        }
    }, [status]);

    React.useEffect(() => { setStatus('idle') }, [params])

    const bannerData = {
        pageTitle: cat.name,
        ancestors: cat.ancestors,
        bannerPosts: cat.posts
    };

    return(
        <>
            <main>
                <Banner {...bannerData}/>
                <Catalog catSlug={ params.slug }/>
            </main>
        </>
    );
}