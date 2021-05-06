import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles/banner.scss';

import Breadcrumbs from './breadcrumbs';
import BannerPost from './post';
import BannerPostPreview from './preview';
import Slider from '~/features/slider/slider';
import Search from '~/features/search/index';

const { API_URL } = process.env;

function Banner({ pageTitle = 'Matoon Store', ancestors, bannerPosts: posts }) {

    const [currentPost, setCurrentPost] = React.useState(0);

    function changePost(i) {
        setCurrentPost(i);
    }

    // React.useEffect(() => {
    //     const nextPost = currentPost + 1 < 3 ? currentPost + 1 : 0;
    //     const interval = setInterval(() => setCurrentPost(nextPost), 5000 );

    //     return function cleanUp() {
    //         clearInterval(interval);
    //     }
    // }, [currentPost]);

    const params = useParams();
    const targetDevice = useSelector( state => state.device.target );

    return (
        <div className="banner" id="banner">
            <div className="banner-title">{ pageTitle }</div>
            { params.search && <span className="banner-search-phrase">{ decodeURI(params.search) }</span>  }
            { ( ancestors && ancestors[0] ) && <Breadcrumbs {...{ancestors}}/> }
            { targetDevice !== 'mobile' && <div className="banner-search-wrapper"><Search/></div> }
            { 
                ( posts && posts[0] ) && 
                <>
                <BannerPost data={ posts[currentPost] }/>
                <BannerPostPreview {...{ changePost, posts, active: currentPost }}/>
                <Slider id="banner-slider" className="banner-slider" slide={ currentPost } buttons={ false }>
                    { posts.map(({ image, title }) => <img src={ API_URL + image } alt={ title } className="banner-post-image"/> ) }
                </Slider>
                </>
            }
        </div>
    );
}

export default Banner;