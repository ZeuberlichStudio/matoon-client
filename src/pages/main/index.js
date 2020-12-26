import React from 'react';

import Banner from 'features/banner';
import Feed from 'features/feed';

const { API_URL } = process.env;
const tempApiEndpoint = 'categories/обложки-на-документы';

export default function MainPage() {

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

    const bannerData = {
        pageTitle: 'Matoon Store', 
        bannerPosts
    };

    return (
        <main id="title-page" className="title-page">
            { <Banner {...bannerData}/> }
            <Feed/>
        </main>
    );
}