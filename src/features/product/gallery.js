import React from 'react';

import './styles/gallery.scss';

const { API_URL } = process.env;
// const { CDN_URL } = process.env;
const CDN_URL = 'https://matoon.imgix.net/';

export default function ProductGallery({ images }) {

    const [currentImage, setCurrentImage] = React.useState(0);

    const formFullPath = path => CDN_URL + path;

    const renderImagePreview = (image, i) => (
        <button 
            key={i}
            onClick={ () => setCurrentImage(i) }
            className={currentImage === i ? 'active' : null}
        >
            <img src={formFullPath(image)} alt=""/>
        </button>
    );

    return (
        <div className="product-gallery">
            <div className="product-gallery_selected">
                <img src={ images && ( formFullPath(images[currentImage]) ) } alt=""/>
            </div>

            <div className="product-gallery_preview">
                { images && images.map(renderImagePreview) }
            </div>
        </div>
    );
}