import React from 'react';

import CategoryBanner from 'features/category-banner/banner';
import Feed from 'features/feed';

const { API_URL } = process.env;

export default function MainPage() {

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [cat, setCat] = React.useState(null);

    React.useEffect(() => {
        if ( status === 'idle' ) {
            setStatus('loading');

            fetch(`${API_URL}categories/subcat-1`)
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

    return (
        <main id="title-page" className="title-page">
            <CategoryBanner {...{cat}}/>
            <Feed/>
        </main>
    );
}