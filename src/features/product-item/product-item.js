import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import { Tabs, Tab } from 'features/tabs/tabs';
import { ResizableText, ButtonsBlock } from 'features/resizable-containers/containers';
import { ProductGallery, ProductOptions, ProductDetails, ProductPrice, ProductAddToCart } from 'features/product';

import './product-item.scss';

const { API_URL } = process.env;

export function ProductItemSuggested({data, i}) {
    const {
        id,
        slug,
        variants,
        name,
        shortDescription,
        price
    } = data;

    const image = variants[0].images[0];

    return (
        <div className={`product-item-suggested`} key={ i }>
            <div className="product-item-suggested_image">
                <img src={ API_URL + image } alt={ name }/>
            </div>

            <div className="product-item-suggested_info">
                <div className="product-item-suggested_info_name-and-price">
                    <span>{ price + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-suggested_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-suggested_link">
                <Link to="/"><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemMini({data, i}) {

    const {
        id,
        slug,
        variants,
        name,
        shortDescription,
        price
    } = data;

    const image = variants[0].images[0];

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>
            <div className="product-item-mini_image">
                <img src={ API_URL + image } alt={ name }/>
            </div>

            <div className="product-item-mini_share">
                <div className="product-item-mini_share_vk"></div>
                <div className="product-item-mini_share_fb"></div>
                <div className="product-item-mini_share_fav"></div>
            </div>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">
                    <span>{ price + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-mini_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-mini_link">
                <Link to={itemLink}><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemFull({data, i}) {

    const {
        id,
        variants,
        name,
        sku,
        description,
        specs,
        attributes,
        price,
        meta
    } = data;

    //User interaction logic
    const [variant, setVariant] = React.useState(0);
    const [config, setConfig] = React.useState({ color: 'black' });
    
    function findVariant() {
        const variant =
        variants.findIndex(item => {
            let found = false;

            for ( const [option, value] of Object.entries(config) ) {
                if ( item[option] !== value ) {
                    found = false;
                    continue;
                }
                
                found = true;
            }

            return found;
        })

        setVariant( variant );
    }

    React.useEffect(() => {
        findVariant();
    }, [config])


    return (
        <div className={`product-item product-item-${ i } product-item-full`}>
            <ProductGallery images={ variants[variant].images }/>

            <h2 className="product-name">{ name }</h2>

            <ProductOptions {...{attributes, config, setConfig}}/>

            <ProductDetails {...{ description, specs, sku, stock: meta.stock }}/>

            <ProductPrice {...{price}}/>

            <ProductAddToCart />

            <div className="product-share">
                <div className="product-share_vk"></div>
                <div className="product-share_fb"></div>
                <div className="product-share_fav"></div>
            </div>
        </div>
    );
}