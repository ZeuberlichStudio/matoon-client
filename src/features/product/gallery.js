import React from 'react';
import Image from '~/components/Image';

import './styles/gallery.scss';

export default function ProductGallery({ images }) {

    const [currentImage, setCurrentImage] = React.useState(0);

    const formFullPath = path => CDN_URL + path;

    const renderImagePreview = (image, i) => (
        <button 
            key={i}
            onClick={ () => setCurrentImage(i) }
            className={currentImage === i ? 'active' : null}
        >
            <Image src={image.path}/>
        </button>
    );

    return (
        <div className="product-gallery">
            <div className="product-gallery_selected">
                <Image src={images?.[currentImage].path}/>
            </div>

            <div className="product-gallery_preview">
                { images?.map(renderImagePreview) }
            </div>
        </div>
    );
}