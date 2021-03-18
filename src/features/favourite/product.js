import React from 'react';
import {
    ProductHeader as Header,
    ProductGallery as Gallery,
    ProductDetails as Details,
    ProductPrice as Price,
    ProductOptions as Options,
    ProductAddToCart as AddToCart
} from '~/features/product';
import { withConfig, withDataFetch } from '~/features/product/hoc';
import './styles/product.scss';
import { useSelector } from 'react-redux';
import Scrollable from '~/features/containers/scrollable';

function FavouriteProduct({ data, status, config, setConfig, variant, buttonCallback }) {

    const targetDevice = useSelector( state => state.device.target );

    const [currVar, setCurrVar] = React.useState(0);

    const {
        _id,
        sku,
        slug,
        name,
        images,
        variants,
        desc,
        specs,
        prices,
    } = data;

    const closeButton = <CloseButton callback={ buttonCallback }/>;

    return (
        <div className="favourite-product">
            <Header {...{ name, _id, slug, closeButton }}/>
            {
                targetDevice !== 'tablet' ?
                <Gallery images={variants[currVar].images.concat(images)}/> :
                <TabletGallery images={variants[currVar].images.concat(images)}/>
            }
            <div className="product-options-wrapper">
                <h3> Конфигурация товара </h3>
                <Options {...{ show: 3, variants, setCurrVar }}/>
            </div>
            <Details {...{ desc, specs, sku, stock: variants[currVar].stock }}/>
            {/* {
                targetDevice === 'desktop' ?
                <>
                    <Price {...{prices}}/>
                    <AddToCart/>
                </> :
                <div className="product-buy">
                    <Price {...{prices}}/>
                    <AddToCart/>
                </div>
            } */}
        </div>
    );
}

const { CDN_URL } = process.env;

function TabletGallery({images}) {

    const formFullPath = path => CDN_URL = path;

    return (
        <div className="product-gallery">
            <Scrollable>
                { images && images.map( ( image, i ) =>  <img src={formFullPath(image)} alt="" key={i}/> ) }
            </Scrollable>
        </div>
    );
}

function CloseButton({callback}) {
    return (
        <button className="product-header_close" onClick={ callback }>
            <span></span>
        </button>
    );
}

export default FavouriteProduct;