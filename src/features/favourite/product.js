import React from 'react';
import {
    ProductHeader as Header,
    ProductGallery as Gallery,
    ProductDetails as Details,
    ProductPrice as Price,
    ProductOptions as Options,
    ProductAddToCart as AddToCart
} from '~/features/product';
import './styles/product.scss';
import { useSelector } from 'react-redux';
import Scrollable from '~/features/containers/scrollable';
import Image from '~/components/Image'; 

function FavouriteProduct({ data, buttonCallback }) {

    const targetDevice = useSelector( state => state.device.target );
    const [currVar, setCurrVar] = React.useState(0);
    const [qty, setQty] = React.useState(1);
    const [currPrice, setCurrPrice] = React.useState(0);

    const {
        _id,
        sku,
        slug,
        name,
        images,
        variants,
        desc,
        specs,
        prices,
    } = data;

    React.useEffect(() => { console.log(variants) }, [variants]);

    const closeButton = <CloseButton callback={ buttonCallback }/>;

    return (
        <div key={_id} className="favourite-product">
            <Header {...{ name, _id, slug, closeButton }}/>
            {
                targetDevice !== 'tablet' ?
                <Gallery key={currVar} images={variants[currVar]?.images?.concat(images)}/> :
                <TabletGallery images={variants[currVar]?.images?.concat(images)}/>
            }
            <div className="product-options-wrapper">
                <h3> Конфигурация товара </h3>
                <Options {...{ show: 3, variants, setCurrVar }}/>
            </div>
            <Details {...{ desc, specs, sku, stock: variants[currVar].stock }}/>
            {
                targetDevice !== 'desktop' ?
                <div className="product-purchase-wrapper">
                    <Price {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>
                    <AddToCart 
                        _id={_id}
                        variantId={variants[currVar]._id}
                        qty={qty}
                        priceAmount={prices[currPrice].amount}
                    />
                </div> :
                <>
                    <Price {...{ qty, setQty, prices, currPrice, setCurrPrice, stock: variants[currVar]?.stock }}/>
                    <AddToCart 
                        _id={_id}
                        variantId={variants[currVar]._id}
                        qty={qty}
                        priceAmount={prices[currPrice].amount}
                    />
                </>                            
            }
        </div>
    );
}

const { STATIC_SOURCE } = process.env;

function TabletGallery({images}) {
    return (
        <div className="product-gallery">
            <Scrollable>
                { 
                    images?.length > 0 ? 
                    images.map( ( image, i ) =>  <Image key={i} src={`${STATIC_SOURCE}${image.path}`}/> ) :
                    <Image /> 
                }
            </Scrollable>
        </div>
    );
}

function CloseButton({callback}) {
    return (
        <button className="product-header_close" onClick={ callback }>
            <span></span>
        </button>
    );
}

export default FavouriteProduct;