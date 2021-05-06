import React from 'react';
import Image from '~/components/Image';
import { ProductShare } from '~/features/product';
import './styles/list-item.scss';

const {STATIC_SOURCE} = process.env;

function FavouriteListItem({ item, setProduct, setColumn }) {

    const { 
        _id,
        name, 
        slug,
        images,
        sku, 
        prices 
    } = item;

    function openProduct() {
        setProduct(item);
        setColumn(1);
    }

    const imageSrc = images[0]?.path ? `${STATIC_SOURCE}${images[0]?.path}` : '';

    return (
        <div className="favourite-list-item">
            <div className="favourite-list-item_image">
                <Image src={imageSrc}/>   
            </div>
            <h2 className="favourite-list-item_name">{ name }</h2>
            <span className="favourite-list-item_sku">{ `Арт: ${sku}` }</span>
            <span className="favourite-list-item_price">{ `${prices[0].amount}₽/шт` }</span>

            <button onClick={openProduct} className="favourite-list-item_more">
                <span>Открыть товар</span>
            </button>
            <ProductShare {...{_id, slug}}/>
        </div>
    );
}

export default FavouriteListItem;