import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './banner.scss';

import Search from 'features/search';

const { API_URL } = process.env;

export default function CategoryBanner({ cat }) {

    const targetDevice = useSelector(state => state.device.target);

    //main page banner tweak
    const location = useLocation();

    const [currentPost, setCurrentPost] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            const nextPost = currentPost + 1 < 4 ? currentPost + 1 : 0;
            setCurrentPost(nextPost);
        }, 5000);

        return () =>  clearInterval( timer );
    }, [currentPost])

    const renderBreadCrumbs = () => (
        cat.ancestors.map((ancestor, i) => 
            i < cat.ancestors.length - 1 ? 
            <li key={i}>{ i > 0 && '/' }
                <Link to={`/catalog/category=${ ancestor.slug }`}>&nbsp;{ ancestor.name }&nbsp;</Link>
            </li> :
            <React.Fragment key={i}>
                <li>{ i > 0 && '/' }<Link to={`/catalog/category=${ ancestor.slug }`}>&nbsp;{ ancestor.name }&nbsp;</Link></li>
                <li>/<span>&nbsp;{ cat.name }&nbsp;</span></li>
            </React.Fragment>
        )
    );

    const renderPostPreview = (post, i) => (
        <button key={i} onClick={ () => setCurrentPost(i) } className={`${currentPost === i ? 'active' : null}`}>
            <img src={ API_URL + post.thumbnail } alt={ post.title }/>
        </button>
    );

    const renderPostImage = (post, i) => (
        <div className="image-wrapper" key={i}>
            <img src={ API_URL + post.image } alt={ post.title }/>
        </div> 
    );

    const demoPostLink = {
        pathname: "/catalog/product=product-0",
        state: {
            backgroundLocation: location
        }
    }

    return (
        <div className="category-banner">
            { /*main page name tweak*/ }
            <h1 className="category-banner_title">{ location.pathname !== '/' && cat ? cat.name : 'Matoon Store' }</h1>
 
            { /*main page breadcrumbs tweak*/ }
            <ul className="category-banner_breadcrumbs">{ location.pathname !== '/' && cat && renderBreadCrumbs() }</ul>

            { targetDevice !== 'mobile' && <Search {...{cat}}/> }

            <div className="category-banner_post-images">
                <div className="images-container" style={{ '--slide': currentPost }}>
                    { (cat && cat.posts.length > 0) && cat.posts.map(renderPostImage) }
                </div>
            </div>

            <div className="category-banner_post">
                <h2>{ (cat && cat.posts.length > 0) && cat.posts[currentPost].title }</h2>
                <p>{ (cat && cat.posts.length > 0) && cat.posts[currentPost].content }</p>
                <Link to={ demoPostLink }><span>Подробнее</span></Link>
            </div>

            <div className="category-banner_posts-preview">{ cat && cat.posts.map(renderPostPreview) }</div>
        </div>
    );
}