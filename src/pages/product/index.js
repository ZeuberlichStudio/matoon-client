import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from 'features/product';

import './index.scss';

const { API_URL } = process.env;

export function ProductPage({ closeButton }, ref) {

    //Fetching data
    const { id: idParam } = useParams();

    const [item, setItem] = React.useState({});
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if ( status === 'idle' ) {
            fetch(`${ API_URL }products/_id=${ idParam }`)
                .then( data => data.json() )
                .then( data => {
                    setItem( data[0] );
                    setStatus('succeeded');
                })
                .catch( err => setError( err ) );
        }
    }, []);

    const targetDevice = useSelector( state => state.device.target );

    const [currVar, setCurrVar] = React.useState(0);

    const {
        _id: id,
        categories,
        slug,
        name,
        images,
        variations,
        attributes,
        attributeMap: attrMap,
        materials,
        desc,
        specs,
        prices,
    } = item;

    return(
        <main ref={ ref } id="product-page" className="product-page">
            {
                status == 'succeeded' &&
                <>
               {
                    targetDevice !== 'mobile' &&
                    <div className="product-page_suggested-wrapper">
                        <Product.Suggested {...{materials, cat: categories[0], exclude: slug}}/>
                    </div>
                }

                <div className="product-page_product-wrapper">
                    <div className="product-page_product">
                        <Product.Header {...{ name, closeButton, slug, id }}/>
                        <Product.Gallery images={ variations[currVar].images.concat(images) }/>

                        <div className="product-options-wrapper">
                            <h3>Конфигурация товара</h3>
                            <Product.Options {...{ show: 3, vars: variations, setCurrVar, attrMap }}/>
                        </div>

                        <Product.Details {...{ desc, specs, sku: variations[currVar].sku, stock: variations[currVar].stock }}/>
                        {/* { targetDevice === 'mobile' && <Product.Suggested/> } */}
                        {
                            targetDevice === 'mobile' ?
                            <div className="product-purchase-wrapper">
                                <Product.Price {...{prices}}/>
                                <Product.AddToCart/>
                            </div> :
                            <>
                                <Product.Price {...{prices}}/>
                                <Product.AddToCart/>
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