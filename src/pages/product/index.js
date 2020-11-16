import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from 'features/product';

import './index.scss';

const { API_URL } = process.env;

export function ProductPage({ closeButton }, ref) {

    //Fetching data
    const { slug: slugParam } = useParams();

    const [item, setItem] = React.useState({});
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if ( status === 'idle' ) {
            fetch(`${ API_URL }products/slug=${ slugParam }`)
                .then( data => data.json() )
                .then( data => {
                    setItem( data[0] );
                    setStatus('succeeded');
                })
                .catch( err => setError( err ) );
        }
    }, []);

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
        if ( status === 'succeeded' ) findVariant();
    }, [status, config])

    const targetDevice = useSelector( state => state.device.target );

    //Destructuring data
    const {
        _id: id,
        slug,
        name,
        variants,
        attributes,
        description,
        specs,
        sku,
        meta,
        prices,
        onSale,
        salePrices
    } = item;


    return(
        <main ref={ ref } id="product-page" className="product-page">
            {
                status == 'succeeded' &&
                <>
               {
                    targetDevice !== 'mobile' &&
                    <div className="product-page_suggested-wrapper">
                        <Product.Suggested/>
                    </div>
                }

                <div className="product-page_product-wrapper">
                    <div className="product-page_product">
                        <Product.Header {...{ name, closeButton, slug, id }}/>
                        <Product.Gallery images={ variants[variant].images }/>

                        <div className="product-options-wrapper">
                            <h3>Конфигурация товара</h3>
                            <Product.Options attributes={ attributes } shown={ 3 } {...{ config, setConfig }}/>
                        </div>

                        <Product.Details {...{ description, specs, sku, stock: meta.stock }}/>
                        { targetDevice === 'mobile' && <Product.Suggested/> }
                        {
                            targetDevice === 'mobile' ?
                            <div className="product-purchase-wrapper">
                                <Product.Price prices={ !onSale ? prices : salePrices }/>
                                <Product.AddToCart/>
                            </div> :
                            <>
                                <Product.Price prices={ !onSale ? prices : salePrices }/>
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