import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Image from '~/components/Image.js';

import './styles/banner.scss';

import Breadcrumbs from './Breadcrumbs';
import BannerPostText from './BannerPostText';
import BannerPostsPreview from './BannerPostsPreview';
import Slider from '~/features/slider/slider';
import Search from '~/features/search';

function Banner({ pageTitle, ancestors, posts }) {

    const [currentPost, setCurrentPost] = React.useState(0);

    function changePost(i) {
        setCurrentPost(i);
    }

    React.useEffect(() => {
        const nextPost = currentPost + 1 < posts.length ? currentPost + 1 : 0;
        const interval = setInterval(() => setCurrentPost(nextPost), 5000 );

        return function cleanUp() {
            clearInterval(interval);
        }
    }, [currentPost]);

    const params = useParams();
    const targetDevice = useSelector( state => state.device.target );

    return (
        <div className="banner" id="banner">
            <div className="banner-title">{ pageTitle ?? 'Matoon Store' }</div>
            { params.search && <span className="banner-search-phrase">{ decodeURI(params.search) }</span>  }
            { ( ancestors && ancestors[0] ) && <Breadcrumbs {...{ancestors}}/> }
            { targetDevice !== 'mobile' && <div className="banner-search-wrapper"><Search/></div> }
            { 
                ( posts && posts[0] ) && 
                <>
                <BannerPostText post={posts[currentPost]} i={currentPost}/>
                <BannerPostsPreview {...{ changePost, posts, active: currentPost }}/>
                <Slider id="banner-slider" className="banner-slider" slide={ currentPost } buttons={ false }>
                    { posts.map(({ image, title }) => <Image src={image.path} alt={ title } className="banner-post-image"/> ) }
                </Slider>
                </>
            }
        </div>
    );
}

export default Banner;