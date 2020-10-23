import React from 'react';

import './styles/gallery.scss';

const { API_URL } = process.env;

export default function ProductGallery({ images }) {

    const [currentImage, setCurrentImage] = React.useState(0);

    const renderImagePreview = (image, i) => (
        <button 
            key={i}
            onClick={ () => setCurrentImage(i) }
            className={currentImage === i ? 'active' : null}
        >
            <img src={API_URL + image} alt=""/>
        </button>
    );

    return (
        <div className="product-gallery">
            <div className="product-gallery_selected">
                <img src={API_URL + images[currentImage]} alt=""/>
            </div>

            <div className="product-gallery_preview">
                { images.map(renderImagePreview) }
            </div>
        </div>
    );
}