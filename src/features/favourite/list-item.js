import React from 'react';
import { ProductShare } from 'features/product';
import './styles/list-item.scss';

const { API_URL } = process.env;

function FavouriteListItem({ item, setProduct, setColumn }) {

    const { 
        name, 
        slug,
        variants,
        sku, 
        price 
    } = item;

    const image = variants[0].images[0];

    function openProduct() {
        setProduct(item);
        setColumn(1);
    }

    return (
        <div className="favourite-list-item">
            <div className="favourite-list-item_image">
                <img src={ API_URL + image } alt=""/>   
            </div>
            <h2 className="favourite-list-item_name">{ name }</h2>
            <span className="favourite-list-item_sku">{ `Арт: ${sku}` }</span>
            <span className="favourite-list-item_price">{ `${price}₽/шт` }</span>

            <button onClick={openProduct} className="favourite-list-item_more">
                <span>Открыть товар</span>
            </button>
            <ProductShare {...{slug}}/>
        </div>
    );
}

export default FavouriteListItem;