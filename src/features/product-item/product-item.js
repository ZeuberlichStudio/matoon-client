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
        _id: id,
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

    const onSale = false;
    const salePrice = 590;
    const discount = '-' + parseInt((price - salePrice) / price * 100) + '%' ;

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>
            <div className="product-item-mini_discount">
                <span>{ discount }</span>
            </div>

            <div className="product-item-mini_image">
                <img src={ API_URL + image } alt={ name }/>
            </div>

            <ProductShare {...{ slug, id }}/>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">
                    {
                        onSale ?
                        <span>
                            <span className='discount-price'>{ salePrice + '₽' }</span>
                            <span className="old-price">{`Было ${price} ₽`}</span>
                        </span> :
                        <span>{ price + '₽' }</span>
                    }
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
        _id: id,
        slug,
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

            <ProductShare {...{ slug, id }}/>
        </div>
    );
}