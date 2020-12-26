import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import { Tabs, Tab } from 'features/tabs/tabs';
import { ResizableText, ButtonsBlock } from 'features/resizable-containers/containers';
import { 
    ProductGallery, 
    ProductShare,
    ProductOptions, 
    ProductDetails, 
    ProductPrice, 
    ProductAddToCart 
} from 'features/product';

import './product-item.scss';

const { API_URL } = process.env;
const { CDN_URL } = process.env;
const formFullPath = path => CDN_URL + path;

export function ProductItemSuggested({data, i}) {
    const {
        id,
        slug,
        images,
        name,
        desc,
        prices
    } = data;

    return (
        <div className={`product-item-suggested`} key={ i }>
            <div className="product-item-suggested_image">
                <img src={formFullPath(images[0])} alt={ name }/>
            </div>

            <div className="product-item-suggested_info">
                <div className="product-item-suggested_info_name-and-price">
                    <span>{ prices[0].amount + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-suggested_info_desc">{desc}</div>
            </div>

            <div className="product-item-suggested_link">
                <Link to="/"><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemMini({data, i}) {

    const {
        _id: id,
        slug,
        images,
        name,
        desc,
        prices,
        salePrices,
        onSale
    } = data;

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    const formFullPath = path => CDN_URL + path;
    const discount = (price, salePrice) => '-' + parseInt((price - salePrice) / price * 100) + '%' ;

    // const saleMarker = (
    //     <span>
    //         <span className='discount-price'>{ salePrices[0].amount + '₽' }</span>
    //         <span className="old-price">{`Было ${prices[0].amount} ₽`}</span>
    //     </span>
    // );

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>
            {
                onSale &&
                <div className="product-item-mini_discount">
                    <span>{ discount(0, 0) }</span>
                </div>
            }

            <div className="product-item-mini_image">
                <img src={formFullPath(images[0])} alt={name}/>
            </div>

            <ProductShare {...{ slug, id }}/>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">                        
                    <span>{ prices[0].amount + '₽' }</span>
                    <h2>{name}</h2>
                </div>
                <div className="product-item-mini_info_desc">{desc}</div>
            </div>

            <div className="product-item-mini_link">
                <Link to={itemLink}><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemFull({data, i}) {

    const [currVar, setCurrVar] = React.useState(0);

    const {
        _id: id,
        slug,
        name,
        images,
        variants,
        attributes,
        attributeMap: attrMap,
        desc,
        specs,
        prices,
    } = data;

    return (
        <div className={`product-item product-item-${ i } product-item-full`}>
            <ProductGallery images={variants[currVar].images.concat(images)}/>

            <h2 className="product-name">{name}</h2>

            <ProductOptions {...{ show: 3, vars: variants, setCurrVar, attrMap }}/>

            <ProductDetails {...{ desc, specs, sku: variants[currVar].sku, stock: variants[currVar].stock }}/>

            <ProductPrice prices={prices}/>

            <ProductAddToCart />

            <ProductShare {...{ slug, id }}/>
        </div>
    );
}