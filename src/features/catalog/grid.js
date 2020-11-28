import React from 'react';
import { useSelector } from 'react-redux';
import { 
    ProductItemMini as ItemMini, 
    ProductItemFull as ItemFull
} from 'features/product-item';
import ItemMobile from 'features/product-item/mobile';
import GridLoader from './grid-loader';
import { entries } from 'lodash';

const {
    API_URL
} = process.env;

export default function ProductGrid({ catSlug, search, view = 'mini' }) {

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(null);

    const queryState = useSelector( state => state.query );

    const limit = 20;
    const [offset, setOffset] = React.useState(0);
    const [final, setFinal] = React.useState(false);

    function buildQuery() {
        const {
            sort,
            filter
        } = queryState;

        const params = {
            sort,
            limit,
            offset
        }

        for ( const [field, value] of Object.entries(filter) ) {
            if ( value ) params[field] = value;
        }

        let query = '';

        for ( const [param, value] of Object.entries(params) ) {
            if ( 
                value !== null && 
                value !== 'undefined' 
            ) query +=`&${param}=${value}`;
        }

        return query;
    }

    function fetchProducts() {
        setStatus('loading');

        const endpoint = API_URL + `products?${buildQuery()}`;

        console.log(endpoint);

        fetch(endpoint)
            .then( data => data.json() )
            .then( result => {
                setStatus('succeeded');
                setTotalCount(result.totalMatches);
                setProducts(products.concat(result.rows));
            })
            .catch( err => {
                setStatus('failed');
                setError(err);
            });
    }

    React.useEffect(() => {
        if ( status === 'idle' ) fetchProducts();
    }, [status]);

    React.useEffect(() => {
        if ( status !== 'succeeded' ) return;
        setOffset(offset + limit);
        if ( products.length >= totalCount ) setFinal(true);
    }, [status]);

    React.useEffect(() => {
        setOffset(0);
        setProducts([]);
        setError(null);
        setStatus('idle')
    }, [queryState]);

    const beaconRef = React.useRef();

    React.useEffect(() => {
        if ( final ) return;

        const observer = new IntersectionObserver( entries => {
            if ( 
                entries[0].intersectionRatio <= 0 || 
                status === 'loading'
            ) return;
            fetchProducts();
        });

        observer.observe(beaconRef.current);

        return () => observer.disconnect();
    }, [ status, final, offset, products ]);

    const targetDevice = useSelector( state => state.device.target );

    function renderProduct( item, i ) {
        if ( targetDevice === 'mobile' ) {
            return <ItemMobile data={item} i={i} key={item._id}/>;
        } else if ( view === 'mini' ) {
            return <ItemMini data={item} i={i} key={item._id}/>;
        } else if ( view === 'full' ) {
            return (
                <div key={i} className="product-item-wrapper">
                    <ItemFull data={item} i={i} key={item._id}/>
                </div> 
            );
        }
    }

    return (
        <div className={`product-grid product-grid-${view}`}>
            {
                products[0] && 
                products.map(renderProduct)
            }
            {
                status === 'loading' &&
                <GridLoader view={ targetDevice === 'mobile' ? 'mobile' : view }/>
            }
            {
               ( status === 'succeeded' && !products[0] ) && 
               <span>По Вашему запросу ничего не найдено</span>
            }
            {
                ( status === 'succeeded' && final ) &&
                <span>Похоже, это всё</span>
            }
            <div ref={beaconRef} id="beacon"></div>
        </div>
    );
}