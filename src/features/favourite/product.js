import React from 'react';
import {
    ProductHeader as Header,
    ProductGallery as Gallery,
    ProductDetails as Details,
    ProductPrice as Price,
    ProductOptions as Options,
    ProductAddToCart as AddToCart
} from 'features/product';
import { withConfig, withDataFetch } from 'features/product/hoc';
import './styles/product.scss';
import { useSelector } from 'react-redux';
import Scrollable from 'features/containers/scrollable';

function FavouriteProduct({ data, status, config, setConfig, variant, buttonCallback }) {

    const targetDevice = useSelector( state => state.device.target );

    const {
        name,
        slug,
        variants,
        attributes,
        sku,
        meta,
        description,
        specs,
        prices
    } = data;

    const closeButton = <CloseButton callback={ buttonCallback }/>;

    return (
        <div className="favourite-product">
            <Header {...{ name, slug, closeButton }}/>
            {
                targetDevice !== 'tablet' ?
                <Gallery images={ variants && variants[variant].images }/> :
                <TabletGallery images={ variants && variants[variant].images }/>
            }
            <div className="product-options-wrapper">
                <h3> Конфигурация товара </h3>
                <Options {...{ attributes: attributes || [], config, setConfig, variant }}/>
            </div>
            <Details {...{ description, specs, sku, stock: meta.stock }}/>
            {
                targetDevice === 'desktop' ?
                <>
                    <Price {...{ prices, stock: meta.stock }}/>
                    <AddToCart/>
                </> :
                <div className="product-buy">
                    <Price {...{ prices, stock: meta.stock }}/>
                    <AddToCart/>
                </div>
            }
        </div>
    );
}

const { API_URL } = process.env;

function TabletGallery({images}) {
    return (
        <div className="product-gallery">
            <Scrollable>
                { images && images.map( ( image, i ) =>  <img src={API_URL + image} alt="" key={i}/> ) }
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

export default withConfig(FavouriteProduct);