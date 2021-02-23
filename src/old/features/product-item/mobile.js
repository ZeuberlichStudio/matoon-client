import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Product from 'features/product';
import './product-item.scss';
import { ProductShare as Share } from 'features/product';

const 
    { API_URL } = process.env,
    { CDN_URL } = process.env,
    formFullPath = path => CDN_URL + path;

export default function ProductItemMobile({data, i}) {

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    //User interaction logic
    const [currVar, setCurrVar] = React.useState(0);

    const {
        _id: id,
        name,
        slug,
        sku,
        images,
        variants,
        attributes,
        attributMap: attrMap,
        desc,
        prices
    } = data;

    return (
        <div className={`product-item product-item-${i} product-item-mobile`} key={ i }>
            <div className="product-item-mobile_images">
                <Product.Gallery images={variants[currVar].images.concat(images)}/>
            </div>

            <div className="product-item-mobile_options">
                <Product.Options {...{ show: 3, vars: variants, setCurrVar, attrMap }}/>
            </div>

            <div className="product-item-mobile_info">
                <div className="product-item-mobile_info_name-and-price">
                    <span>{ prices[0].amount + 'P' }</span>
                    <h2>{ name }</h2>
                </div>
                <span className="product-item-mobile_info_sku">Арт: { variants[currVar].sku }</span>
                <span className="product-item-mobile_info_stock">В наличии: { variants[currVar].stock }шт.</span>
                <div className="product-item-mobile_info_desc">{ desc }</div>
            </div>

            <div className="product-item-mobile_link">
                <Link to={ itemLink }><span>Подробнее</span></Link>
            </div>

            <Share {...{slug}}/>
        </div>
    );
}