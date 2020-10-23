import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './banner.scss';

export default function CategoryBanner({ catSlug }) {

    const {
        API_URL
    } = process.env;

    const targetDevice = useSelector(state => state.device.target);

    const [currentPost, setCurrentPost] = React.useState(0);

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [cat, setCat] = React.useState(null);

    React.useEffect(() => {
        setStatus('loading');
        fetch(`${API_URL}categories/${catSlug}`)
            .then( data => data.json())
            .then( result => {
                setCat(result[0]);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
    }, []);

    function changePost(postIndex) {
        setCurrentPost(postIndex);
    }

    const renderBreadCrumbs = () => (
        cat.ancestors.map((ancestor, i) => 
            i < cat.ancestors.length - 1 ? 
            <li>{ i > 0 && '/' }<Link>&nbsp;{ ancestor.name }&nbsp;</Link></li> :
            <React.Fragment>
                <li>{ i > 0 && '/' }<Link>&nbsp;{ ancestor.name }&nbsp;</Link></li>
                <li>/<Link>&nbsp;{ cat.name }&nbsp;</Link></li>
            </React.Fragment>
        )
    );

    const renderPostPreview = (post, i) => (
        <button onClick={ () => changePost(i) } className={`${currentPost === i ? 'active' : null}`}>
            <img src={ API_URL + post.thumbnail } alt={ post.title }/>
        </button>
    );

    const renderPostImage = (post) => (
        <div className="image-wrapper">
            <img src={ API_URL + post.image } alt={ post.title }/>
        </div> 
    );

    return (
        <div className="category-banner">
            <h1 className="category-banner_title">{ cat && cat.name }</h1>

            <ul className="category-banner_breadcrumbs">{ cat && renderBreadCrumbs() }</ul>

            { targetDevice !== 'mobile' ? <div className="category-search-placeholder"></div> : null }

            <div className="category-banner_post-images">
                <div className="images-container" style={{ '--slide': currentPost }}>
                    { (cat && cat.posts.length > 0) && cat.posts.map(renderPostImage) }
                </div>
            </div>

            <div className="category-banner_post">
                <h2>{ (cat && cat.posts.length > 0) && cat.posts[currentPost].title }</h2>
                <p>{ (cat && cat.posts.length > 0) && cat.posts[currentPost].content }</p>
                <Link><span>Подробнее</span></Link>
            </div>

            <div className="category-banner_posts-preview">{ cat && cat.posts.map(renderPostPreview) }</div>
        </div>
    );
}