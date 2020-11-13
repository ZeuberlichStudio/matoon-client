import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTarget } from 'app/device';
import ProductItemMobile from 'features/product-item/mobile';
import { ProductItemMini, ProductItemFull } from 'features/product-item/product-item';

const {
    API_URL
} = process.env;

export default function ProductGrid({ catSlug, search, view = 'mini' }) {

    const locationParams = useParams();

    const targetDevice = useSelector(selectTarget);
    const apiQueryParamsState = useSelector(state => state.query );

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [products, setProducts] = React.useState([]);

    function buildApiQuery() {
        const params = {
            //change after showcase!!!
            //cat: catSlug,
            search: locationParams.search,
            cat: '',
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
        console.log(apiQueryParamsState);

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
        if ( targetDevice === 'mobile' ) return <ProductItemMobile data={item} i={i} key={item._id}/>;
        else if( view === 'mini' ) return <ProductItemMini data={item} i={i} key={item._id}/>;
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
            { 
                (!products[0] && status === 'succeeded') && 'Nothing found'
            }
        </div>
    );
}