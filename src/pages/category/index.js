import React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';
import NotFoundPage from 'pages/404';
import CategoryBanner from 'features/category-banner/banner';
import Catalog from 'features/catalog/catalog';

const { API_URL } = process.env;

export default function CategoryPage() {

    const params = useParams();

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [cat, setCat] = React.useState(null);

    React.useEffect(() => {
        if ( status === 'idle' ) {
            setStatus('loading');

            fetch(`${API_URL}categories/${params.slug}`)
            .then( data => data.json())
            .then( result => {
                setCat(result[0]);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
        }
    }, []);

    return(
        <>
            {
                status === 'succeeded' && !cat ? 
                <NotFoundPage/> : 
                <main>
                    <CategoryBanner {...{cat, error}}/>
                    <Catalog catSlug={ params.slug }/>
                </main>
            }
        </>
    );
}