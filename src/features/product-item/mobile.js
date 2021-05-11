import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Product from '~/features/product';
import './product-item.scss';
import { ProductShare as Share } from '~/features/product';

export default function ProductItemMobile({data, i}) {

    const backgroundLocation = useLocation();

    //User interaction logic
    const [currVar, setCurrVar] = React.useState(0);

    const {
        _id,
        name,
        slug,
        sku,
        images,
        variants,
        shortDesc,
        prices
    } = data;

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    return (
        <div className={`product-item product-item-${i} product-item-mobile`} key={ i }>
            <div className="product-item-mobile_images">
                <Product.Gallery images={variants[currVar].images.concat(images)}/>
            </div>

            <div className="product-item-mobile_options">
                <Product.Options {...{ show: 3, variants, setCurrVar }}/>
            </div>

            <div className="product-item-mobile_info">
                <div className="product-item-mobile_info_name-and-price">
                    <span>{ prices[0].amount + 'P' }</span>
                    <h2>{ name }</h2>
                </div>
                <span className="product-item-mobile_info_sku">Арт: {sku}</span>
                <span className="product-item-mobile_info_stock">В наличии: { variants[currVar].stock }шт.</span>
                { shortDesc && <div className="product-item-mobile_info_desc">{ shortDesc }</div> }
            </div>

            <div className="product-item-mobile_link">
                <Link to={ itemLink }><span>Подробнее</span></Link>
            </div>

            <Share  {...{ _id, slug }}/>
        </div>
    );
}