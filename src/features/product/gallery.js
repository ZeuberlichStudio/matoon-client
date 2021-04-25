import React from 'react';
import Image from '~/components/Image';

import './styles/gallery.scss';

const {STATIC_SOURCE} = process.env;

export default function ProductGallery({ images }) {

    const [currentImage, setCurrentImage] = React.useState(0);

    const renderImagePreview = (image, i) => {
        const imageSrc = images?.[i]?.path ? `${STATIC_SOURCE}${images[i].path}` : '';

        return (
            <button 
                key={i}
                onClick={ () => setCurrentImage(i) }
                className={currentImage === i ? 'active' : null}
            >
                <Image src={imageSrc}/>
            </button>
        );
    }

    const imageSrc = images?.[currentImage]?.path ? `${STATIC_SOURCE}${images[currentImage].path}` : '';

    return (
        <div className="product-gallery">
            <div className="product-gallery_selected">
                <Image src={imageSrc}/>
            </div>

            <div className="product-gallery_preview">
                { images.length > 0 ? images?.map(renderImagePreview) : renderImagePreview(null, 0) }
            </div>
        </div>
    );
}