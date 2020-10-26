import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Product from 'features/product';

import './index.scss';

const { API_URL } = process.env;

const productTest = { 
    "_id" : "5f689fc9342826442cbd25b9", 
    "slug" : "product-0", 
    "categories" : [
        "subcat-0"
    ], 
    "name" : "Gucci Wallet", 
    "sku" : "g-679", 
    "description" : "A wallet is a small, flat case that can be used to carry such small personal items as paper currency, credit cards, and identification documents (driver's license, identification card, club card, etc.), photographs, transit pass, business cards and other paper or laminated cards.", 
    "shortDescription" : "A wallet is a small, flat case that can be used to carry such small personal items as paper currency, credit cards, and identification documents (driver's license, identification card, club card, etc.), photographs, transit pass, business cards and other paper or laminated cards.", 
    "variants" : [
        {
            "images" : [
                "static/images/wallet_black-0.jpg", 
                "static/images/wallet_black-1.jpg", 
                "static/images/wallet_black-2.jpg", 
                "static/images/wallet_black-3.jpg", 
                "static/images/wallet_black-4.jpg"
            ], 
            "_id" : "5f693f27c8ea83122827ecae", 
            "name" : "Кошелёк Gucci чёрный", 
            "color" : "black"
        }, 
        {
            "images" : [
                "static/images/wallet_red-0.jpg", 
                "static/images/wallet_red-1.jpg", 
                "static/images/wallet_red-2.jpg", 
                "static/images/wallet_red-3.jpg", 
                "static/images/wallet_red-4.jpg"
            ], 
            "_id" : "5f693f27c8ea83122827ecaf", 
            "name" : "Кошелёк Gucci красный", 
            "color" : "red"
        }
    ], 
    "meta" : {
        "stock" : 700, 
        "orders" : 100, 
        "updatedAt" : "2020-09-22T00:02:47.653+0000", 
        "createdAt" : "2020-09-21T12:50:38.849+0000"
    }, 
    "__v" : 0, 
    "attributes" : {
        "colors" : [
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            },
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            },
            {
                "name": "black",
                "colorData": "rgb(0,0,0)"
            },
            {
                "name": "red",
                "colorData": "rgb(200,0,80)"
            }
        ], 
        "brands" : [
            {
                "name": "Gucci"
            }
        ]
    }, 
    "specs" : {
        "Карманы" : "3", 
        "Отдел для мелочи" : "есть", 
        "Вид застёжки" : "молния"
    }, 
    "materials" : [
        "leather", 
        "metal"
    ], 
    "for" : "unisex", 
    "price" : 1400
}

const {
    _id,
    name,
    variants,
    description,
    specs,
    sku,
    meta,
    attributes,
    price
} = productTest;

export default function ProductPage({ closeButton }) {

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
        name,
        variants,
        attributes,
        description,
        specs,
        sku,
        meta,
        price,
    } = item;


    return(
        <main id="product-page" className="product-page">
            {
                status == 'succeeded' &&
                <>
                { console.log(targetDevice) }
                {
                    targetDevice !== 'mobile' &&
                    <div className="product-page_suggested-wrapper">
                        <Product.Suggested/>
                    </div>
                }

                <div className="product-page_product-wrapper">
                    <div className="product-page_product">
                        <Product.Header {...{ name, closeButton }}/>
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
                                <Product.Price price={ price }/>
                                <Product.AddToCart/>
                            </div> :
                            <>
                                <Product.Price price={ price }/>
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