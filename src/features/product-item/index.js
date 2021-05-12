import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from '~/components/Image';
import { 
    ProductGallery, 
    ProductShare,
    ProductOptions, 
    ProductDetails, 
    ProductPrice, 
    ProductAddToCart 
} from '~/features/product';

import './product-item.scss';

const {STATIC_SOURCE} = process.env;

export function ProductItemSuggested({data, i}) {
    const {
        slug,
        variants,
        name,
        shortDesc,
        prices
    } = data;

    const location = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: {
            backgroundLocation: location.state?.backgroundLocation ?? location
        }
    }

    const imageSrc = variants[0].images[0]?.path ? `${STATIC_SOURCE}${variants[0].images[0]?.path}` : '';

    return (
        <div className={`product-item-suggested`} key={ i }>
            <div className="product-item-suggested_image">
                <Image src={imageSrc} alt={name}/>
            </div>

            <div className="product-item-suggested_info">
                <div className="product-item-suggested_info_name-and-price">
                    <span>{ prices[0].amount + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                { shortDesc && <div className="product-item-suggested_info_desc">{shortDesc}</div> }
            </div>

            <div className="product-item-suggested_link">
                <Link to={itemLink}><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemMini({data, i}) {

    const {
        _id,
        slug,
        variants,
        name,
        shortDesc,
        maxPrice
    } = data;

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    const imageSrc = variants[0].images[0]?.path ? `${STATIC_SOURCE}${variants[0].images[0].path}` : '';

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>

            <div className="product-item-mini_image">
                <Image src={imageSrc} alt={name}/>
            </div>

            <ProductShare {...{ _id, slug }}/>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">                        
                    <span>до {maxPrice}₽</span>
                    <h2>{name}</h2>
                </div>
                { shortDesc && <div className="product-item-mini_info_desc">{shortDesc}</div> }
            </div>

            <div className="product-item-mini_link">
                <Link to={itemLink}><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemFull({data, i}) {

    const [currVar, setCurrVar] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [currPrice, setCurrPrice] = React.useState(0);

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

    return (
        <div className={`product-item product-item-${ i } product-item-full`}>
            <ProductGallery images={variants[currVar]?.images.concat(images)}/>

            <h2 className="product-name">{name}</h2>

            <ProductOptions {...{ show: 3, variants, setCurrVar }}/>

            <ProductDetails {...{ desc, specs, sku, stock: variants[currVar]?.stock }}/>

            <ProductPrice {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>

            <ProductAddToCart 
                _id={_id} 
                variantId={variants[currVar]._id} 
                qty={qty}
                priceAmount={prices[currPrice].amount}
            />

            <ProductShare {...{ _id, slug }}/>
        </div>
    );
}