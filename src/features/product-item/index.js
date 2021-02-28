import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import Image from '~/components/Image';
import { Tabs, Tab } from '~/features/tabs/tabs';
import { ResizableText, ButtonsBlock } from '~/features/resizable-containers/containers';
import { 
    ProductGallery, 
    ProductShare,
    ProductOptions, 
    ProductDetails, 
    ProductPrice, 
    ProductAddToCart 
} from '~/features/product';

import './product-item.scss';

export function ProductItemSuggested({data, i}) {
    const {
        id,
        sku,
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
        images,
        name,
        desc,
        maxPrice
    } = data;

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${id}`,
        state: { backgroundLocation }
    }

    // const discount = (price, salePrice) => '-' + parseInt((price - salePrice) / price * 100) + '%' ;

    // const saleMarker = (
    //     <span>
    //         <span className='discount-price'>{ salePrices[0].amount + '₽' }</span>
    //         <span className="old-price">{`Было ${prices[0].amount} ₽`}</span>
    //     </span>
    // );

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>

            <div className="product-item-mini_image">
                <Image src={images[0]?.path || ''} alt={name}/>
            </div>

            <ProductShare {...{ id }}/>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">                        
                    <span>до {maxPrice}₽</span>
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
    const [qty, setQty] = React.useState(1);
    const [currPrice, setCurrPrice] = React.useState(0);

    const {
        _id: id,
        sku,
        name,
        images,
        variants,
        desc,
        specs,
        prices,
    } = data;

    return (
        <div className={`product-item product-item-${ i } product-item-full`}>
            <ProductGallery images={variants[currVar].images.concat(images)}/>

            <h2 className="product-name">{name}</h2>

            <ProductOptions {...{ show: 3, variants, setCurrVar }}/>

            <ProductDetails {...{ desc, specs, sku, stock: variants[currVar]?.stock }}/>

            <ProductPrice {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>

            <ProductAddToCart 
                varId={variants[currVar]._id} 
                sku={''} 
                qty={qty}
                price={prices[currPrice].amount} 
            />

            <ProductShare {...{ id }}/>
        </div>
    );
}