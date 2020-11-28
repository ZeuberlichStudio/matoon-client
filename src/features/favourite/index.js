import React from 'react';
import { useSelector } from 'react-redux';
import Product from './product';
import List from './list';

import './styles/favourite.scss';

const { API_URL } = process.env;

function Favourite({ closeButton }, ref) {

    const [column, setColumn] = React.useState(0);
    const targetDevice = useSelector( ({device}) => device.target );

    const [product, setProduct] = React.useState(null);

    function goBack() {   
        if ( targetDevice === 'mobile' ) setColumn(column - 1);
        else setProduct(null);
    };

    return (
        <div ref={ref} id="favourite" className="favourite" style={{ '--column': column }}>
            <div className="favourite-product-wrapper">
                { product && <Product data={product} status='succeeded' buttonCallback={goBack}/> }
            </div>
            <div className="favourite-list-wrapper">
                <List {...{ closeButton, setProduct, setColumn }}/>
            </div>
        </div>
    );
}

export default React.forwardRef(Favourite);