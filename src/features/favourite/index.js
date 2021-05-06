import React from 'react';
import { useSelector } from 'react-redux';
import Product from './product';
import List from './list';
import { selectTarget } from '~/app/device';

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

    //fixes scrollability on ios < 14
    const mobileScrollableStyle = { 
        overflowX: 'hidden', 
        overflowY: 'scroll', 
        '-webkit-overflow-scrolling': 'touch',
        '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
        maskImage: 'radial-gradient(white, black)'
    }

    return (
        <div ref={ref} id="favourite" className="favourite" style={{ '--column': column }}>
            <div style={targetDevice == 'mobile' ? mobileScrollableStyle : null} className="favourite-product-wrapper">
                { product && <Product data={product} status='succeeded' buttonCallback={goBack}/> }
            </div>
            <div style={targetDevice == 'mobile' ? mobileScrollableStyle : null} className="favourite-list-wrapper">
                <List {...{ closeButton, setProduct, setColumn }}/>
            </div>
        </div>
    );
}

export default React.forwardRef(Favourite);