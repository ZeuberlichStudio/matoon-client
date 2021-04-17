import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Product from '~/features/product';
import './product-item.scss';
import { valuesIn } from 'lodash';

const { API_URL } = process.env;

export default function ProductItemMobile({data, i}) {

    const {
        id,
        name,
        slug,
        sku,
        meta,
        variants,
        attributes,
        shortDescription,
        price
    } = data;

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

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
        <div className={`product-item product-item-${i} product-item-mobile`} key={ i }>
            <div className="product-item-mobile_images">
                <Product.Gallery images={ variants[variant].images }/>
            </div>

            <div className="product-item-mobile_options">
                <Product.Options {...{attributes, config, setConfig}}/>
            </div>

            <div className="product-item-mobile_info">
                <div className="product-item-mobile_info_name-and-price">
                    <span>{ price + 'P' }</span>
                    <h2>{ name }</h2>
                </div>
                <span className="product-item-mobile_info_sku">Арт: { sku }</span>
                <span className="product-item-mobile_info_stock">В наличии: { meta.stock }шт.</span>
                <div className="product-item-mobile_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-mobile_link">
                <Link to={ itemLink }><span>Подробнее</span></Link>
            </div>

            <div className="product-item-mobile_share">
                <div className="product-item-mobile_share_vk"></div>
                <div className="product-item-mobile_share_fb"></div>
                <div className="product-item-mobile_share_fav"></div>
            </div>
        </div>
    );
}