import React from 'react';
import apiCall from '~/common/api-call.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '~/features/product';

import './index.scss';

export function ProductPage({ closeButton }, ref) {
    const {slug: _id} = useParams();
    const [item, setItem] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    function fetchProduct() {
        setStatus('pending');

        apiCall(`products/${_id}`)
            .then(res => {
                setItem(res.data);
                console.log(res.data);
                setStatus('success');
            })
            .catch(err => {
                setStatus('failed');
                console.error(err);
            });
    }

    React.useEffect(fetchProduct, []);

    const targetDevice = useSelector( state => state.device.target );
    const [currVar, setCurrVar] = React.useState(0);
    const {
        cat,
        slug,
        sku,
        name,
        images,
        variants,
        materials,
        desc,
        specs,
        prices,
    } = item;

    return(
        <main ref={ ref } id="product-page" className="product-page">
            {
                status === 'success' &&
                <>
                {/* {
                    targetDevice !== 'mobile' &&
                    <div className="product-page_suggested-wrapper">
                        <Product.Suggested {...{materials, cat, exclude: _id}}/>
                    </div>
                } */}

                <div className="product-page_product-wrapper">
                    <div className="product-page_product">
                        <Product.Header {...{ name, closeButton, slug, id: _id }}/>
                        <Product.Gallery images={ variants[currVar].images.concat(images) }/>

                        <div className="product-options-wrapper">
                            <h3>Конфигурация товара</h3>
                            <Product.Options {...{ show: 3, variants, setCurrVar }}/>
                        </div>

                        <Product.Details {...{ desc, specs, sku, stock: variants[currVar].stock }}/>
                        {/* { targetDevice === 'mobile' && <Product.Suggested/> } */}
                        {/* {
                            targetDevice === 'mobile' ?
                            <div className="product-purchase-wrapper">
                                <Product.Price {...{prices}}/>
                                <Product.AddToCart/>
                            </div> :
                            <>
                                <Product.Price {...{prices}}/>
                                <Product.AddToCart/>
                            </>                            
                        } */}
                    </div>
                </div>
                </>
            }
        </main>
    );
}

export default React.forwardRef(ProductPage);