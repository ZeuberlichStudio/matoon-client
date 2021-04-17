import React from 'react';
import apiCall from '~/common/api-call.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from '~/features/product';

import './index.scss';

export function ProductPage({ closeButton }, ref) {
    const {slug} = useParams();
    const [item, setItem] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    function fetchProduct() {
        setStatus('pending');

        apiCall(`products/${slug}?isSlug=true`)
            .then(res => {
                setItem(res.data);
                setStatus('success');
            })
            .catch(err => {
                setStatus('failed');
                console.error(err);
            });
    }

    React.useEffect(fetchProduct, [slug]);

    const targetDevice = useSelector( state => state.device.target );
    const [currVar, setCurrVar] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [currPrice, setCurrPrice] = React.useState(0);

    const {
        _id,
        cat,
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
                {
                    targetDevice !== 'mobile' &&
                    <div className="product-page_suggested-wrapper">
                        <Product.Suggested {...{materials, cat, exclude: _id}}/>
                    </div>
                }

                <div className="product-page_product-wrapper">
                    <div className="product-page_product">
                        <Product.Header {...{ name, closeButton, slug, _id }}/>
                        <Product.Gallery images={ variants[currVar].images.concat(images) }/>

                        <div className="product-options-wrapper">
                            <h3>Конфигурация товара</h3>
                            <Product.Options {...{ show: 3, variants, setCurrVar }}/>
                        </div>

                        <Product.Details {...{ desc, specs, sku, stock: variants[currVar].stock }}/>
                        { targetDevice === 'mobile' && <Product.Suggested {...{materials, cat, exclude: _id}}/> }
                        {
                            targetDevice === 'mobile' ?
                            <div className="product-purchase-wrapper">
                                <Product.Price {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>

                                <Product.AddToCart 
                                    _id={_id}
                                    variantId={variants[currVar]._id}
                                    qty={qty}
                                    priceAmount={prices[currPrice].amount}
                                />
                            </div> :
                            <>
                                <Product.Price {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>

                                <Product.AddToCart 
                                    _id={_id}
                                    variantId={variants[currVar]._id}
                                    qty={qty}
                                    priceAmount={prices[currPrice].amount}
                                />
                            </>                            
                        }
                    </div>
                </div>
                </>
            }
        </main>
    );
}

export default React.forwardRef(ProductPage);