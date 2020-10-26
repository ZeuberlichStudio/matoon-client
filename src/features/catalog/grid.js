import React from 'react';
import { useSelector } from 'react-redux';
import { selectTarget } from 'app/device';
import ProductItemMobile from 'features/product-item/mobile';
import { ProductItemMini, ProductItemFull } from 'features/product-item/product-item';

export default function ProductGrid({ catSlug, view = 'mini' }) {

    const targetDevice = useSelector(selectTarget);
    const apiQueryParamsState = useSelector(state => state.query );

    const {
        API_URL
    } = process.env;

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [products, setProducts] = React.useState([]);

    function buildApiQuery() {
        const params = {
            cat: catSlug,
            sort: apiQueryParamsState.sort
        };

        for ( const [key, value] of Object.entries(apiQueryParamsState.filter) ) {
            if ( value ) params[key] = value;
        }

        let query = '';

        for ( const [key, value] of Object.entries(params) ) {
            if ( value ) query += `&${key}=${value}`;
        }

        return query;
    }

    React.useEffect(() => {
        fetch(API_URL + `products?${buildApiQuery()}`)
            .then( data => data.json() )
            .then( result => {
                setProducts(result);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
    }, [apiQueryParamsState]);

    const renderProduct = (item, i) => {
        if ( targetDevice === 'mobile' ) return <ProductItemMobile data={item} i={i} key={i}/>;
        else if( view === 'mini' ) return <ProductItemMini data={item} i={i} key={i}/>;
        else if( view === 'full' ) return (
            <div key={i} className="product-item-wrapper">
                <ProductItemFull data={item} i={i} key={item._id}/>
            </div> 
        );
        else return console.log('error occurred when trying to render a product');
    }

    return (
        <div className={`product-grid product-grid-${view}`}>
            { products && products.map(renderProduct) }
        </div>
    );
}