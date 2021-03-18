import React from 'react';
import apiCall from '~/common/api-call';
import { useSelector } from 'react-redux';
import { 
    ProductItemMini as ItemMini, 
    ProductItemFull as ItemFull
} from '~/features/product-item';
import ItemMobile from '~/features/product-item/mobile';
import { SpinningLoader as Loader } from '~/features/loader';


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
        console.log(queryState);

        const params = {
            limit,
            offset,
            sort: queryState.sort,
            catSlug: queryState.catSlug,
            search: queryState.search,
            ...queryState.filter
        }

        let query = '';

        for ( const [key, value] of Object.entries(params) ) {
            query = value ? (query + `&${key}=${value}`) : query;
        }

        return query;
    }

    function fetchProducts() {
        setStatus('loading');
        
        apiCall(`products?${buildQuery()}`)
            .then(res => {
                console.log();
                setStatus('success');
                setProducts(products.concat(res.data));
            })
            .catch( err => {
                setStatus('failed');
                setError(err);
            });
    }

    React.useEffect(() => {
        if ( status == 'idle' ) fetchProducts();
    }, [status]);

    React.useEffect(() => {
        if ( status != 'success' ) return;
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
        <div className="product-grid">
            <div className={`product-grid_items product-grid_items-${view}`}>
                {
                    products[0] && 
                    products.map(renderProduct)
                }
                {
                    status === 'loading' &&
                    <div className="loading">
                        <Loader/>
                    </div>
                }
            </div>
            {
                ( status === 'success' && !products[0] ) &&
                <div className="product-grid_empty">
                    <span>К сожалению, по вашему запросу ничего не найдено.</span>
                </div>
            }
            <div ref={beaconRef} id="beacon"></div>
        </div>
    );
}