import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTarget } from 'app/device';
import ProductItemMobile from 'features/product-item/mobile';
import { ProductItemMini, ProductItemFull } from 'features/product-item';
import GridLoader from './grid-loader';
import { set } from 'lodash';

const {
    API_URL
} = process.env;

export default function ProductGrid({ catSlug, search, view = 'mini' }) {

    const locationParams = useParams();

    const targetDevice = useSelector(selectTarget);
    const apiQueryParamsState = useSelector(state => state.query );

    const limit = 20;
    const [offset, setOffset] = React.useState(0);
    const [totalMatches, setTotalMatches] = React.useState(null);
    const [final, setFinal] = React.useState(false);

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [products, setProducts] = React.useState([]);

    function buildApiQuery() {
        const params = {
            //change after showcase!!!
            //cat: catSlug,
            search: locationParams.search,
            cat: '',
            sort: apiQueryParamsState.sort,
            offset: offset,
            limit
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

    function fetchProducts(offset = 0) {
        setStatus('loading');
        console.log(API_URL + `products?${buildApiQuery()}`)
        fetch(API_URL + `products?${buildApiQuery()}`)
        .then( data => data.json() )
        .then( result => {
            if ( totalMatches === null ) setTotalMatches(result.totalMatches);
            setOffset(offset + limit);
            console.log(result);
            setProducts(products.concat(result.rows));
            setStatus('succeeded');
        })
        .catch( err => {
            setError(err);
            setStatus('failed');
        });
    }

    React.useEffect(() => {
        if ( status !== 'idle' ) {
            setStatus('idle');
            setProducts([]);
            setOffset(0);
            setFinal(false);
            setTotalMatches(null);
        }

        fetchProducts(0);
    }, [apiQueryParamsState]);

    React.useEffect(() => {
        if ( status === 'idle' ) return;
        if ( totalMatches <= products.length ) setFinal(true);
    }, [totalMatches, products]);

    React.useEffect(() => {
        if ( final ) return;

        const observer = new IntersectionObserver( entries => {
            if ( entries[0].intersectionRatio <= 0 || status === 'loading' ) return;
            fetchProducts(offset);
        });

        observer.observe(document.getElementById('bottom'));

        return () => observer.disconnect();
    }, [products, status, final, offset]);

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
            { status === 'succeeded' && products.map(renderProduct) }
            { (!products[0] && status === 'succeeded') && 'Nothing found' }
            { status === 'loading' && <GridLoader view={ targetDevice === 'mobile' ? 'mobile' : view }/> }
            { final && <span>Похоже, это все.</span> }
            <div id="bottom"></div>
        </div>
    );
}